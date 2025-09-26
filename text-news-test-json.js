try {
    function processTags(t4Tag) {
      myContent = content || null;
      return String(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, myContent, language, isPreview, t4Tag));
    }
  
    function getLayout(contentLayout) {
      var tid = content.getContentTypeID();
      formatter = contentLayout;
      format = publishCache.getTemplateFormatting(dbStatement, tid, formatter);
      formatString = format.getFormatting();
      return processTags(formatString);
    }

    var list = {};
    var topics = processTags('<t4 type="content" name="News Topics" output="normal" display_field="name" delimiter="|" />');

    if (topics.toLowerCase().indexOf('legendary') === -1) {
      list['newsTopics'] = topics;
      list['title'] = processTags('<t4 type="content" name="Title" output="normal" modifiers="striptags,htmlentities" />').replace(/&/gi,'&amp;');
      list['articleSubhead'] = processTags('<t4 type="content" name="Article Subhead" output="normal" modifiers="striptags,htmlentities" />').replace(/&/gi,'&amp;');
      list['newsTypes'] = processTags('<t4 type="content" name="News Types" output="normal" display_field="name" delimiter="|" />');
      list['author'] = processTags('<t4 type="content" name="Author" output="normal" modifiers="striptags,htmlentities" />').replace(/&/gi,'&amp;');
      list['schoolsColleges'] = processTags('<t4 type="content" name="Schools and Colleges" output="normal" display_field="name" delimiter="|" />');
      list['staffDepartment'] = processTags('<t4 type="content" name="Department" output="normal" display_field="value" delimiter="|" />');
      list['publishDate'] = processTags('<t4 type="content" name="Publish Date" output="normal" date_format="yyyy-MM-dd-HH:MM:ss" />');
      list['publishDateText'] = processTags('<t4 type="content" name="Publish Date" output="normal" date_format="MMMM d, yyyy" />');
      list['image'] = processTags('<t4 type="content" name="Media Library Image" output="normal" formatter="v10/image/pxl-crop" cdn="true" pxl-filter-id="64" />');
      list['url'] = processTags('<t4 type="content" name="Title" output="fulltext" use-element="true" filename-element="Title" modifiers="striptags,htmlentities" />');
      var jsonObj = new org.json.JSONObject(list);
      document.write(jsonObj.toString() + ','); 
    } else {
      document.write('');
    }	
  
  } catch (err) {
    document.write(err);
  }