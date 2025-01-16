<div class="hero--basic hero--news global-padding--15x<t4 type="content" name="Media Library Image" output="selective-output" format="-ignore hero--news__photo" formatter="path/*" /> bg--dark">
  <div class="grid-container">
      <div class="grid-x grid-margin-x">
          <div class="cell auto">
              <div class="hero--basic__text text-margin-reset">
                  <h1>
                      <t4 type="content" name="Title" output="normal" modifiers="striptags,htmlentities" />
                  </h1>
                  <div class="eyebrow">
                      <a href="<?php tags_keys('<t4 type="content" name="News Types" output="normal" display_field="name" delimiter="|" />', '<t4 type="navigation" name="Link to News & Stories" id="991" />', 'newsTypes', '|'); ?>">
                          <t4 type="content" name="News Types" output="normal" display_field="value" modifiers="striptags,htmlentities" />
                      </a>
                  </div>

                  <div class="news--detail__details global-spacing--0x text-margin-reset">
                      <t4 type="content" name="Author" output="selective-output" process-format="true" format="<p><strong>Written by
              <t4 type=&quot;content&quot; name=&quot;Author&quot; output=&quot;normal&quot; modifiers=&quot;striptags,htmlentities&quot; />
              </strong></p>" />
                      <p>
                          <t4 type="content" name="Publish Date" output="normal" date_format="EEEE, MMMM d, yyyy" />
                      </p>
                  </div>


                  <t4 type="navigation" name="Breadcrumbs Fulltext" id="1027" />


              </div>
          </div>
      </div>
      <t4 type="content" name="Media Library Image" output="selective-output" formatter="path/*" process-format="true" format="<div class=&quot;news--detail__hero-photo&quot;>
        <figure class=&quot;aspect-ratio-frame&quot; style=&quot;--aspect-ratio: 74/116&quot;>
            <img loading=&quot;eager&quot; sizes=&quot;(min-width: 1280px) 1160px, calc(93.75vw - 21px)&quot;
                src=&quot;<t4 type=&quot;content&quot; name=&quot;Media Library Image&quot; output=&quot;normal&quot; formatter=&quot;v10/image/pxl-crop&quot; cdn=&quot;true&quot; pxl-filter-id=&quot;43&quot; />&quot; srcset=&quot;
                <t4 type=&quot;content&quot; name=&quot;Media Library Image&quot; output=&quot;normal&quot; formatter=&quot;v10/image/pxl-crop&quot; cdn=&quot;true&quot; pxl-filter-id=&quot;43&quot; /> 500w,
                <t4 type=&quot;content&quot; name=&quot;Media Library Image&quot; output=&quot;normal&quot; formatter=&quot;v10/image/pxl-crop&quot; cdn=&quot;true&quot; pxl-filter-id=&quot;42&quot; /> 768w,
                <t4 type=&quot;content&quot; name=&quot;Media Library Image&quot; output=&quot;normal&quot; formatter=&quot;v10/image/pxl-crop&quot; cdn=&quot;true&quot; pxl-filter-id=&quot;41&quot; /> 1160w&quot; alt=&quot;<t4 type=&quot;content&quot; name=&quot;Image Caption&quot; output=&quot;normal&quot; modifiers=&quot;&quot; />&quot; class=&quot;js-processed&quot; />
            "/>
            <t4 type="content" name="Image Caption" output="selective-output" process-format="true" format="<figcaption><blockquote><t4 type=&quot;content&quot; name=&quot;Image Caption&quot; output=&quot;normal&quot; modifiers=&quot;striptags,htmlentities&quot;/></blockquote></figcaption>" />
        <t4 type="content" name="Media Library Image" output="selective-output" process-format="true" format="</figure>
      </div>" />
    </div>
</div>


<div class="news--detail__body grid-container global-padding--10x">
<div class="grid-x grid-margin-x">
    <div class="cell medium-8">
        <div class="news--detail__summary text-margin-reset">
            <p class="intro-text">
                <t4 type="content" name="Article Subhead" output="normal" modifiers="striptags,htmlentities" />
            </p>
        </div>
        <div class="global-spacing--5x">
            <div class="wysiwyg">
                <t4 type="content" name="Story article" output="normal" modifiers="medialibrary,nav_sections" />
            </div><!-- /.wysiwyg -->
        </div>
        <div class="news--detail__details global-spacing--3x text-margin-reset">
            <t4 type="content" name="Author" output="selective-output" process-format="true" format="<p><strong>Written by
    <t4 type=&quot;content&quot; name=&quot;Author&quot; output=&quot;normal&quot; modifiers=&quot;striptags,htmlentities&quot; />
    </strong></p>" />
            <p>
                <t4 type="content" name="Publish Date" output="normal" date_format="EEEE, MMMM d, yyyy" />
            </p>
        </div>
        <div class="global-spacing--3x">
            <div class="tags tags__links">
                <h2 class="tags__heading show-for-sr">Tags:</h2>
                <ul>
                    <?php tags_list('<t4 type="content" name="News Topics" output="normal" display_field="name"  delimiter="|" />', '<t4 type="navigation" name="Link to News & Stories" id="991" />', 'newsTopics', '|'); ?>
                </ul>
            </div>
        </div>
    </div>
    <div class="cell medium-4">
        <t4 type="content" name="Callout Title" output="selective-output" process-format="true" format="<article class=&quot;callout text-margin-reset oho-animate oho-animate-single fade-in oho-animate--in&quot;>
<h2 class=&quot;h6&quot;>
    <t4 type=&quot;content&quot; name=&quot;Callout Title&quot; output=&quot;normal&quot; modifiers=&quot;&quot; />
</h2>

<div class=&quot;global-spacing--2x&quot;>
    <p>
    <t4 type=&quot;content&quot; name=&quot;Callout Description&quot; output=&quot;normal&quot; modifiers=&quot;&quot; />
    </p>
</div>
<div class=&quot;global-spacing--3x&quot;>
    <a href=&quot;<t4 type=&quot;content&quot; name=&quot;Callout CTA Internal Link&quot; output=&quot;linkurl&quot; modifiers=&quot;nav_sections&quot; /><t4 type=&quot;content&quot; name=&quot;Callout CTA External Link&quot; output=&quot;normal&quot; />&quot; class=&quot;btn&quot;>
    <t4 type=&quot;content&quot; name=&quot;Callout CTA Title&quot; output=&quot;normal&quot; modifiers=&quot;&quot; />
    </a>
</div>
</article>" />

    </div>
</div>
</div>
<section class="related-news-stories-section global-padding--15x bg--dark bg--blue bg--gradient">
<div class="grid-container oho-animate-sequence oho-animate--in">


    <div class="grid-x grid-margin-x">
        <div class="cell large-9">



            <div class="section-heading--basic text-margin-reset">

                <h2 class="oho-animate fade-in oho-animate--in">Similar News &amp; Stories</h2>



                <div class="section-heading__link global-spacing--2x oho-animate fade-in oho-animate--in">
                    <a href="<?php tags_keys('<t4 type="content" name="News Topics" output="normal" display_field="name" />', '<t4 type="navigation" name="Link to News & Stories" id="991" delimiter="|" />', 'newsTopics', '|'); ?>">More Similar News &amp; Stories</a>
                </div>

            </div>
        </div>
    </div>

    <ul class="grid-x grid-margin-x global-spacing--6x">
        <t4 type="navigation" name="Related news in news fulltext" id="988" />
    </ul>
</div>
</section>
<t4 type="content" name="Faculty Tags" output="selective-output" modifiers="medialibrary,nav_sections" process-format="true" format="<section class=&quot;contact-listing-section&quot;>
<div class=&quot;grid-container oho-animate-sequence oho-animate--in&quot;>
<div class=&quot;grid-x grid-margin-x&quot;>
<div class=&quot;cell large-9&quot;>



<div class=&quot;section-heading--basic text-margin-reset&quot;>

<h2 class=&quot;oho-animate fade-in oho-animate--in&quot;>Contact Listing</h2>

<div class=&quot;section-heading__link global-spacing--2x oho-animate fade-in oho-animate--in&quot;>
<a href=&quot;<t4 type=&quot;navigation&quot; name=&quot;Faculty and Staff Bio Link to Home&quot; id=&quot;995&quot; />&quot;>Faculty and Staff Directory</a>
</div>

</div>
</div>
</div>
</div>
<t4 type=&quot;navigation&quot; name=&quot;Contact Listing Inside News Fulltext&quot; id=&quot;1016&quot; />
</section>   " />
