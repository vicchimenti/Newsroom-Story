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
     *     @version 4.0
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
      *      Returns an array of sdg items
      */
    //  function assignSdgList(arrayOfValues) {
 
    //      let listValues = '';
 
    //      for (let i = 0; i < arrayOfValues.length; i++) {
 
    //          listValues += '<li class="list-group-item sdgIcon">' + arrayOfValues[i].trim() + '</li>';
    //      }
 
    //      return listValues;
    //  }
 


 
 
 

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
      *      Returns a formatted html img tag
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
      */
    //  function getTarget(itemId) {
 
    //      let mediaInfo = getMediaInfo(itemId);
    //      let media = readMedia(itemId);
    //      let info = new ImageInfo();
    //      info.setInput(media);
 
    //      let target = (info.check()) ? '' + mediaInfo.getName() + '' : null;
 
    //      return target;
    //  }
 
 
 
 
     /***
      *      Returns an array of list items
      */
    //  function formatTargets(arrayOfValues) {
 
    //      let listValues = '';
 
    //      for (let i = 0; i < arrayOfValues.length; i++) {
 
    //          if (arrayOfValues[i]) {
    //              let cleanValue = arrayOfValues[i].replace(/\s/g, '-');
    //              listValues += '' + cleanValue.trim() + ' ';
    //          }
    //      }
 
    //      return listValues;
    //  }

 
 
 
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

            '<span class="cardImageWrapper"><img src="' + expertsDict.primaryImage.content + '" class="expertsImage card-img-top p-0 m-0" alt="' + expertsDict.contentName.content + '" loading="auto" /></span>' :
            '<span class="expertsImage hidden visually-hidden">No Image Provided</span>';
         
         if (majorNewsDict.mediaImage.content) {

            let imageID = content.get('Media Library Image').getID();
            let mediaInfo = getMediaInfo(imageID);
            let media = readMedia(imageID);
            let info = new ImageInfo;
            info.setInput(media);

            imageString = (info.check()) ?
                '<span class="cardImageWrapper"><img src="' + expertsDict.primaryImage.content + '" class="expertsImage card-img-top p-0 m-0" aria-label="' + mediaInfo.getName() + '" alt="' + mediaInfo.getDescription() + '" width="' + info.getWidth() + '" height="' + info.getHeight() + '" loading="auto" /></span>' :
                '<span class="cardImageWrapper"><img src="' + expertsDict.primaryImage.content + '" class="expertsImage noMediaId card-img-top p-0 m-0" loading="auto" /></span>';
         }


 
 
 
 
         /***
          *  Parse and format sdg icons
          * 
          * */
         if (cejscDict.icons.content) {
 
             let iconArray = cejscDict.icons.content.split(',');
             let iconPathArray = [];

             iconArray.sort();
 
             for (let icon in iconArray) {
 
                 iconPathArray[icon] = mediaTag(iconArray[icon].trim());
             }
 
             let iconValues = assignSdgList(iconPathArray);
             listOfIcons = '<ul class="iconDashboard list-group list-group-horizontal">' + iconValues + '</ul>';
         }





 
   
         /***
          *  write document once
          * 
          * */
         writeDocument(
             [
                articleWrapper,

                titleWrapper,
                summaryString,
                dateString,
                closeWrapper

             ]
         );
 
 
 
 
     } catch (err) {
         document.write(err.message);
     }
