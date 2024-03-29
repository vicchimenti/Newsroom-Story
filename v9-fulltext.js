    /***
     *     @author  Victor Chimenti, MSCS
     *     @file    v9-fulltext.js
     *                  v9/fulltext
     *                  Newsroom: Story
     *                  id:5150
     *
     *     This item will be a shareable fullpage URL
     *     containing the full body of a newsroom story
     *
     *     Document will write once when the page loads
     *
     *     @version 5.2.13
     * 
     */








    /***
     *      Import T4 Utilities
     */
     importClass(com.terminalfour.media.IMediaManager);
     importClass(com.terminalfour.spring.ApplicationContextProvider);
     importClass(com.terminalfour.publish.utils.BrokerUtils);
     importClass(com.terminalfour.media.utils.ImageInfo);
 
 
 
 
     /***
      *      Extract values from T4 element tags
      *      and confirm valid existing content item field
      */
     function getContentValues(tag) {
         try {
             let _tag = BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, tag).trim();
             return {
                 isError: false,
                 content: _tag == '' ? null : _tag
             };
         } catch (error) {
             return {
                 isError: true,
                 message: error.message
             };
         }
     }
 

 
 
     /***
      *      Returns a media object
      */
     function getMediaInfo(mediaID) {
 
         let mediaManager = ApplicationContextProvider.getBean(IMediaManager);
         let media = mediaManager.get(mediaID, language);
 
         return media;
     }
 
 
 
 
     /***
      *      Returns a media stream object
      */
     function readMedia(mediaID) {
 
         let mediaObj = getMediaInfo(mediaID);
         let oMediaStream = mediaObj.getMedia();
 
         return oMediaStream;
     }
 
 
 
 
     /***
      *     Returns a formatted html img tag
      *     for a media library image element
      *
      */
     function mediaTag(mediaPath) {
 
        let itemId = content.get('Media Library Image').getID();
        let mediaInfo = getMediaInfo(itemId);
        let media = readMedia(itemId);
        let info = new ImageInfo();
        info.setInput(media);

        let mediaHTML = (info.check()) ?
            '<img src="' + mediaPath + '" aria-label="' + mediaInfo.getName() + '" alt="' + mediaInfo.getDescription() + '" width="' + info.getWidth() + '" height="' + info.getHeight() + '" loading="auto" />' :
            '<span class="newsroomImageWrapper d-none visually-hidden hidden">Invalid Media ID</span>';

        return mediaHTML;
     }




     /***
      *      Returns a formatted html img tag
      *      for an external image
      */
     function externalImageTag(imagePath, imageAlt, imageTitle) {

        let imageHTML = (imagePath && imageAlt) ?
            '<img src="' + imagePath + '" aria-label="' + imageTitle + '" alt="' + imageAlt + '" loading="auto" />' :
            (imagePath && !imageAlt) ?
            '<img src="' + imagePath + '" aria-label="' + imageTitle + '" alt="' + imageTitle + '" loading="auto" />' :
            '<span class="newsroomImageWrapper d-none visually-hidden hidden">Invalid Image</span>';

        return imageHTML;
     }




     /***
      *      Returns an array of list items
      */
     function assignList(arrayOfValues) {

        let listValues = '';

        for (let i = 0; i < arrayOfValues.length; i++) {

            if (i < arrayOfValues.length-1) {

                listValues += '' + arrayOfValues[i].trim() + ' / ';

            } else {

                listValues += '' + arrayOfValues[i].trim();

            }

        }
        
        return listValues;
     }




     /***
      *      Processes and formats list items into their wrapper
      */
     function processList(rawValues) {

        let arrayOfTops = rawValues.split(',');
        let listItems = assignList(arrayOfTops) || null;

        let result = (listItems) ?
            '<p class="newsroomArticleTopicsHeader">' + listItems + '</p>':
            '<span class="newsroomArticleTopicsHeader d-none hidden visually-hidden">No Valid Topic Provided</span>';

        return result;
     }
 
 

  
     /***
      *      Write the document
      */
     function writeDocument(array) {
 
         for (let i = 0; i < array.length; i++) {
 
             document.write(array[i]);
         }
     }
 
 
 
 
 
 
 
 
     /***
      *  Main
      */
     try {
 
 
         /***
          *      Dictionary of content
          * */
         let fulltextNewsDict = {
 
             contentName: getContentValues('<t4 type="content" name="Name" output="normal" modifiers="striptags,htmlentities" />'),
             headline: getContentValues('<t4 type="content" name="Title" output="normal" modifiers="striptags,htmlentities" />'),
             articleSetup: getContentValues('<t4 type="content" name="Article Setup" output="normal" modifiers="striptags,htmlentities" />'),
             articleSubhead: getContentValues('<t4 type="content" name="Article Subhead" output="normal" modifiers="striptags,htmlentities" />'),
             mediaImage: getContentValues('<t4 type="content" name="Media Library Image" output="normal" formatter="path/*" />'),
             externalImage: getContentValues('<t4 type="content" name="Image" output="imageurl" />'),
             externalImageAlt: getContentValues('<t4 type="content" name="Alt text" output="normal" modifiers="striptags,htmlentities" />'),
             imageCredit: getContentValues('<t4 type="content" name="Image Credit" output="normal" modifiers="striptags,htmlentities" />'),
             caption: getContentValues('<t4 type="content" name="Image Caption" output="normal" modifiers="striptags,htmlentities" />'),
             publishDate: getContentValues('<t4 type="content" name="Publish Date" output="normal" date_format="MMMM d, yyyy" />'),
             author: getContentValues('<t4 type="content" name="Author" output="normal" modifiers="striptags,htmlentities" />'),
             topics: getContentValues('<t4 type="content" name="Topics" output="normal" display_field="name" modifiers="htmlentities" />'),
             fullStory: getContentValues('<t4 type="content" name="Story article" output="normal" modifiers="medialibrary,nav_sections" />'),
             anchor: getContentValues('<t4 type="meta" meta="html_anchor" />'),
             contentId: getContentValues('<t4 type="meta" meta="content_id" />')
 
         };








         /***
          *  html defaults
          * 
          * */
         let openImageWrapper = '<div class="newsroomFeaturedImageWrapper">';
         let closeImageWrapper = '</div>';
         let openRow = '<div class="row">';
         let closeRow = '</div>';
         let openColMd9 = '<div class="col-md-9">';
         let closeColMd9 = '</div>';
         let openColMd3 = '<div class="col-md-3">';
         let closeColMd3 = '</div>';
         let openContainer = '<div class="container">';
         let closeContainer = '</div>';
         let openByline = '<div class="newsroomArticleByline col-md-12">';
         let closeByline = '</div>';
         let openImgAttributes = '<div class="newsroomFeaturedImageAttributes container">';
         let closeImgAttributes = '</div>';
         let openSummaryContainer = '<div class="newsroomArticleMain container">';
         let closeSummaryContainer = '</div>';
         let openNewsShare = '<div class="newsroomArticleShare">';
         let closeNewsShare = '</div>';
         let shareThis = '<h2>Share this</h2>';
         let addThis = '<div class="addthis_inline_share_toolbox"></div>';
         let shareThisEmbed = '<div class="sharethis-inline-share-buttons"></div>';
         let openBody = '<div class="newsroomArticleBody col-md-8">';
         let closeBody = '</div>';
         let openFooterShare = '<div class="newsroomArticleShare col-md-8 offset-md-3">';
         let closeFooterShare = '</div>';


         
 


         

         /***
          *  article wrapper
          * 
          * */
          let closeWrapper = '</article>';
          let articleWrapper = (fulltextNewsDict.contentId.content && fulltextNewsDict.headline.content) ?
            '<article class="newsroomArticleWrapper" id="id' + fulltextNewsDict.contentId.content + '" aria-label="' + fulltextNewsDict.headline.content + '">' :
            (fulltextNewsDict.contentId.content && !fulltextNewsDict.headline.content) ?
            '<article class="newsroomArticleWrapper" id="id' + fulltextNewsDict.contentId.content + '" aria-label="' + fulltextNewsDict.contentName.content + '">' :
            '<article class="newsroomArticleWrapper">';




         /***
          *  page title
          * 
          * */
          let titleWrapper = (fulltextNewsDict.headline.content) ?
            '<h1 id="pageTitle">' + fulltextNewsDict.headline.content + '</h1>' :
            '<h1 id="pageTitle">' + fulltextNewsDict.contentName.content + '</h1>';




         /***
          *  by line
          * 
          * */
          let byLine = (fulltextNewsDict.author.content) ?
            '<div class="newsroomArticleAuthor"><p>Written by ' + fulltextNewsDict.author.content + '</p></div>' :
            '<span class="newsroomArticleAuthor d-none hidden visually-hidden">No Author Provided</span>';




         /***
          *  publish date
          * 
          * */
          let dateString = (fulltextNewsDict.publishDate.content) ?
            '<div class="newsroomArticlePublishedDate"><p>' + fulltextNewsDict.publishDate.content + '</p></div>' :
            '<span class="newsroomArticlePublishedDate d-none hidden visually-hidden">No Publish Date Provided</span>';




         /***
          *  prioritize media library image
          * 
          * */
         let imageString = (fulltextNewsDict.mediaImage.content) ?
            mediaTag(fulltextNewsDict.mediaImage.content) :
            externalImageTag(fulltextNewsDict.externalImage.content, fulltextNewsDict.externalImageAlt.content, fulltextNewsDict.contentName.content);




         /***
          *  image credits
          * 
          * */
          let imageCreditString = (fulltextNewsDict.imageCredit.content) ?
            '<div class="newsroomFeaturedImageCredit col-md-3"><p>Image credit: ' + fulltextNewsDict.imageCredit.content + '</p></div>' :
            '<span class="newsroomFeaturedImageCredit d-none hidden visually-hidden">No Image Credit Provided</span>';




         /***
          *  image caption
          * 
          * */
          let captionString = (fulltextNewsDict.caption.content) ?
            '<div class="newsroomFeaturedImageCaption col-md-9">' + fulltextNewsDict.caption.content + '</div>':
            '<span class="newsroomFeaturedImageCaption d-none hidden visually-hidden">No Caption Provided</span>';




         /***
          *  article summary
          * 
          * */
          let summaryString = (fulltextNewsDict.articleSetup.content) ?
            '<h2 class="newsroomArticleLead">' + fulltextNewsDict.articleSetup.content + '</h2>' :
            (fulltextNewsDict.articleSubhead.content) ?
            '<h2 class="newsroomArticleLead">' + fulltextNewsDict.articleSubhead.content + '</h2>' :
            '<span class="newsroomArticleLead d-none hidden visually-hidden">No Article Setup Provided</span>';




         /***
          *  full story
          * 
          * */
          let fullStoryString = (fulltextNewsDict.fullStory.content) ?
            '<div class="articleText standardContent"><p>' + fulltextNewsDict.fullStory.content + '</p></div>':
            '<span class="articleText d-none hidden visually-hidden">No Full Story Provided</span>';




         /***
          *  process categories
          * 
          * */

          let formattedTopics = (fulltextNewsDict.topics.content) ?
            processList(fulltextNewsDict.topics.content) :
            '<span class="newsroomArticleTopicsHeader d-none hidden visually-hidden">No Valid Topic Provided</span>';




            



         /***
          *  write document once
          * 
          * */
         writeDocument(
             [
                articleWrapper,
                fulltextNewsDict.anchor.content,
                openContainer,
                openRow,
                openColMd9,
                formattedTopics,
                titleWrapper,
                closeColMd9,
                closeRow,
                openRow,
                openByline,
                byLine,
                dateString,
                closeByline,
                closeRow,
                closeContainer,
                openImageWrapper,
                imageString,
                openImgAttributes,
                openRow,
                imageCreditString,
                captionString,
                closeRow,
                closeImgAttributes,
                closeImageWrapper,
                openSummaryContainer,
                openRow,
                openColMd3,
                closeColMd3,
                openBody,
                summaryString,
                fullStoryString,
                closeBody,
                closeRow,
                closeSummaryContainer,
                closeWrapper
             ]
         );
 
 
 
 
     } catch (err) {
         document.write(err.message);
     }
