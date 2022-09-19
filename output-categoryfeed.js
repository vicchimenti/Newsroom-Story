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
     *     @version 9
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
     function assignSdgList(arrayOfValues) {
 
         let listValues = '';
 
         for (let i = 0; i < arrayOfValues.length; i++) {
 
             listValues += '<li class="list-group-item sdgIcon">' + arrayOfValues[i].trim() + '</li>';
         }
 
         return listValues;
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
      *      Returns a formatted html img tag
      */
     function mediaTag(itemId) {
 
        // media path would be a good place to route through get content values to check for nulls and return a detailed error code
         let mediaPath = BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, '<t4 type="media" formatter="path/*" id="' + itemId + '" />');
         let mediaInfo = getMediaInfo(itemId);
         let media = readMedia(itemId);
         let info = new ImageInfo();
         info.setInput(media);
 
         let mediaHTML = (info.check()) ?
             '<figure class="figure"><img src="' + mediaPath + '" class="listgroupImage figure-img img-fluid" aria-label="' + mediaInfo.getName() + '" alt="' + mediaInfo.getDescription() + '" width="' + info.getWidth() + '" height="' + info.getHeight() + '" loading="auto" /></figure><figcaption class="figure-caption visually-hidden hidden">' + mediaInfo.getName() + '</figcaption>' :
             '<span class="listgroupImage visually-hidden hidden">Invalid Image ID</span>';
 
         return mediaHTML;
     }
 
 
 
 
     /***
      *      Returns a formatted html img tag
      */
     function getTarget(itemId) {
 
         let mediaInfo = getMediaInfo(itemId);
         let media = readMedia(itemId);
         let info = new ImageInfo();
         info.setInput(media);
 
         let target = (info.check()) ? '' + mediaInfo.getName() + '' : null;
 
         return target;
     }
 
 
 
 
     /***
      *      Returns an array of list items
      */
     function formatTargets(arrayOfValues) {
 
         let listValues = '';
 
         for (let i = 0; i < arrayOfValues.length; i++) {
 
             if (arrayOfValues[i]) {
                 let cleanValue = arrayOfValues[i].replace(/\s/g, '-');
                 listValues += '' + cleanValue.trim() + ' ';
             }
         }
 
         return listValues;
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
             articleSetup: getContentValues('<t4 type="content" name="Article Setup" output="normal" modifiers="medialibrary,nav_sections" />'),


             sectionId: getContentValues('<t4 type="content" name="Section ID" output="normal" modifiers="striptags,htmlentities" />'),
             articleTitle: getContentValues('<t4 type="content" name="Article Title" output="normal" modifiers="striptags,htmlentities" />'),
             courseName: getContentValues('<t4 type="content" name="Course Name" output="normal" modifiers="striptags,htmlentities" />'),
             college: getContentValues('<t4 type="content" name="College" output="normal" modifiers="striptags,htmlentities" />'),
             academicLevel: getContentValues('<t4 type="content" name="Section Academic Level" output="normal" modifiers="striptags,htmlentities" />'),
             primarySectionName: getContentValues('<t4 type="content" name="Primary Section Name" output="normal" modifiers="striptags,htmlentities" />'),
             subjectDescription: getContentValues('<t4 type="content" name="Subject" output="normal" modifiers="striptags,htmlentities" />'),
             icons: getContentValues('<t4 type="content" name="Icon ID" output="normal" modifiers="striptags,htmlentities" />'),
             lsapIcons: getContentValues('<t4 type="content" name="LSAP ID" output="normal" modifiers="striptags,htmlentities" />'),             
             summaryDescription: getContentValues('<t4 type="content" name="Plaintext Description" output="normal" modifiers="striptags,htmlentities" />'),

             
             fullTextLink: getContentValues('<t4 type="content" name="Title" output="fulltext" use-element="true" filename-element="Title" modifiers="striptags,htmlentities" />'),             
             contentId: getContentValues('<t4 type="meta" meta="content_id" />')
 
         };
 


         
         /***
          *  default html initializations
          * 
          * */

 
 
 
 
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
                 beginningHTML,
                 openCardHeader,
                 titleLink,
                 subtitleString,
                 closeCardHeader,
                 openBodyWrapper,
                 summaryString,
                 listOfLsapIcons,
                 listOfIcons,
                 sectionIdString,
                 closeBodyWrapper,
                 endingHTML
             ]
         );
 
 
 
 
     } catch (err) {
         document.write(err.message);
     }
