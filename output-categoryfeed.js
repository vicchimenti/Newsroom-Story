    /***
     *     @author  Victor Chimenti, MSCS
     *     @file    output-categoryfeed.js
     *                  output/categoryfeed
     *                  id:5150
     *
     *     This content type will work in conjunction with the
     *     Newsroom Topic Selector.
     *
     *     Document will write once when the page loads
     *
     *     @version 4.2
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
      */
     function mediaTag(mediaPath) {
 
         let itemId = content.get('Media Library Image').getID();
         let mediaInfo = getMediaInfo(itemId);
         let media = readMedia(itemId);
         let info = new ImageInfo();
         info.setInput(media);
 
         let mediaHTML = (info.check()) ?
             '<span class="newsroomImageWrapper"><img src="' + mediaPath + '" class="d-inline" aria-label="' + mediaInfo.getName() + '" alt="' + mediaInfo.getDescription() + '" width="' + info.getWidth() + '" height="' + info.getHeight() + '" loading="auto" /></span>' :
             '<span class="newsroomImageWrapper d-none visually-hidden hidden">Invalid Media ID</span>';
 
         return mediaHTML;
     }




    /***
     *      Returns a formatted html img tag
     *      for an external image
     */
        function externalImageTag(imagePath, imageAlt, imageTitle) {

        let imageHTML = (imagePath && imageAlt) ?
            '<span class="newsroomImageWrapper"><img src="' + imagePath + '" class="d-inline" aria-label="' + imageTitle + '" alt="' + imageAlt + '" loading="auto" /></span>' :
            (imagePath && !imageAlt) ?
            '<span class="newsroomImageWrapper"><img src="' + imagePath + '" class="d-inline" aria-label="' + imageTitle + '" alt="' + imageTitle + '" loading="auto" /></span>' :
            '<span class="newsroomImageWrapper d-none visually-hidden hidden">Invalid Image</span>';

        return imageHTML;
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
         let majorNewsDict = {
 
             contentName: getContentValues('<t4 type="content" name="Name" output="normal" modifiers="striptags,htmlentities" />'),
             headline: getContentValues('<t4 type="content" name="Title" output="normal" modifiers="striptags,htmlentities" />'),
             articleSetup: getContentValues('<t4 type="content" name="Article Setup" output="normal" modifiers="striptags,htmlentities" />'),
             mediaImage: getContentValues('<t4 type="content" name="Media Library Image" output="normal" formatter="path/*" />'),
             externalImage: getContentValues('<t4 type="content" name="Image" output="imageurl" />'),
             externalImageAlt: getContentValues('<t4 type="content" name="Alt text" output="normal" modifiers="striptags,htmlentities" />'),
             publishDate: getContentValues('<t4 type="content" name="Publish Date" output="normal" date_format="MMMM d, yyyy" />'),
             fullTextLink: getContentValues('<t4 type="content" name="Title" output="fulltext" use-element="true" filename-element="Title" modifiers="striptags,htmlentities" />'),             
             contentId: getContentValues('<t4 type="meta" meta="content_id" />')
 
         };
 


         
         /***
          *  article wrapper
          * 
          * */
          let closeWrapper = '</article>';
          let articleWrapper = (majorNewsDict.contentId.content && majorNewsDict.headline.content) ?
            '<article class="newsroomArticleWrapper newsroomBlurb contentItem" id="id' + majorNewsDict.contentId.content + 'category" aria-label="' + majorNewsDict.headline.content + '">' :
            (majorNewsDict.contentId.content && !majorNewsDict.headline.content) ?
            '<article class="newsroomArticleWrapper newsroomBlurb contentItem" id="id' + majorNewsDict.contentId.content + 'category" aria-label="' + majorNewsDict.contentName.content + '">' :
            '<article class="newsroomArticleWrapper newsroomBlurb contentItem">';




         /***
          *  title link
          * 
          * */
          let titleWrapper = (majorNewsDict.fullTextLink.content && majorNewsDict.headline.content) ?
            '<h2 class="newsroomArticleTitle"><a href="' + majorNewsDict.fullTextLink.content + '" aria-label="Read the full article: ' + majorNewsDict.headline.content + '">' + majorNewsDict.headline.content + '</a></h2>' :
            (majorNewsDict.fullTextLink.content && !majorNewsDict.headline.content) ?
            '<h2 class="newsroomArticleTitle"><a href="' + majorNewsDict.fullTextLink.content + '" aria-label="Read the full article: ' + majorNewsDict.contentName.content + '">' + majorNewsDict.contentName.content + '</a></h2>' :
            '<h2 class="newsroomArticleTitle">' + majorNewsDict.contentName.content + '</h2>';




         /***
          *  article summary
          * 
          * */
          let summaryString = (majorNewsDict.articleSetup.content) ?
            '<p class="newsroomArticleLead">' + majorNewsDict.articleSetup.content + '</p>' :
            '<span class="newsroomArticleLead d-none hidden visually-hidden">No Article Setup Provided</span>';




         /***
          *  publish date
          * 
          * */
          let dateString = (majorNewsDict.publishDate.content) ?
            '<p class="newsroomArticlePublishedDate">' + majorNewsDict.publishDate.content + '</p>' :
            '<span class="newsroomArticlePublishedDate d-none hidden visually-hidden">No Publish Date Provided</span>';




        /***
          *  prioritize media library image
          * 
          * */
         let imageString = (majorNewsDict.mediaImage.content) ?
            mediaTag(majorNewsDict.mediaImage.content) :
            externalImageTag(majorNewsDict.externalImage.content, majorNewsDict.externalImageAlt.content, majorNewsDict.contentName.content);



   
         /***
          *  write document once
          * 
          * */
         writeDocument(
             [
                articleWrapper,
                imageString,
                titleWrapper,
                summaryString,
                dateString,
                closeWrapper
             ]
         );
 
 
 
 
     } catch (err) {
         document.write(err.message);
     }
