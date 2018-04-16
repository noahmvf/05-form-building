'use strict';

let articleView = {};

articleView.populateFilters = () => {
  $('article').each(function() {
    if (!$(this).hasClass('template')) {
      let val = $(this).find('address a').text();
      let optionTag = `<option value="${val}">${val}</option>`;

      if ($(`#author-filter option[value="${val}"]`).length === 0) {
        $('#author-filter').append(optionTag);
      }

      val = $(this).attr('data-category');
      optionTag = `<option value="${val}">${val}</option>`;
      if ($(`#category-filter option[value="${val}"]`).length === 0) {
        $('#category-filter').append(optionTag);
      }
    }
  });
};

articleView.handleAuthorFilter = () => {
  $('#author-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $(`article[data-author="${$(this).val()}"]`).fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#category-filter').val('');
  });
};

articleView.handleCategoryFilter = () => {
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $(`article[data-category="${$(this).val()}"]`).fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#author-filter').val('');
  });
};

articleView.handleMainNav = () => {
  $('.main-nav').on('click', '.tab', function(e) {
    e.preventDefault();
    $('.tab-content').hide();
    $(`#${$(this).data('content')}`).fadeIn();
  });

  $('.main-nav .tab:first').click();
};

articleView.setTeasers = () => {
  $('.article-body *:nth-of-type(n+2)').hide();
  $('article').on('click', 'a.read-on', function(e) {
    e.preventDefault();
    if ($(this).text() === 'Read on →') {
      $(this).parent().find('*').fadeIn();
      $(this).html('Show Less &larr;');
    } else {
      $('body').animate({
        scrollTop: ($(this).parent().offset().top)
      },200);
      $(this).html('Read on &rarr;');
      $(this).parent().find('.article-body *:nth-of-type(n+2)').hide();
    }
  });
};

// COMMENT: Where is this function called? Why?
// This function is called within the HTML instead of being included within a javascript file. This is because this function alone needs to apply to more than one page.
articleView.initNewArticlePage = () => {
  // TODO (COMPLETED): Ensure the main .tab-content area is revealed. We might add more tabs later or otherwise edit the tab navigation.
  $('.tab-content').show();

  // TODO (COMPLETED): The new articles we create will be copy/pasted into our source data file.
  // Set up this "export" functionality. We can hide it for now, and show it once we have data to export.

  $('#article-json').on('focus', function(){
    $(this).select();
    $document.execCommand('copy');

  });

  // TODO (COMPLETED): Add an event handler to update the preview and the export field if any inputs change.
  $('#new-article').on('change', 'input', 'textarea', articleView.create);

};

articleView.create = () => {
  // TODO (COMPLETED): Set up a variable to hold the new article we are creating.
  // Clear out the #articles element, so we can put in the updated preview
    $('#articles > *').remove(); //this gets all the article's children and removes them


  // TODO (COMPLETED): Instantiate an article based on what's in the form fields:
  let articleObj = {
    title : $('#title').val(),
    category : $('#category').val(),
    author : $('#author').val(),
    authorUrl : $('#authorUrl').val(),
    publishedOn : $('#publishedOn').val(),
    body : $('#publishedOn').val()
  };

  let article = new Article(articleObj);
  // TODO (COMPLETED): Use our interface to the Handblebars template to put this new article into the DOM:
  $('#articles').append(article.toHtml());
  console.log(article);
  // TODO (COMPLETED): Activate the highlighting of any code blocks; look at the documentation for hljs to see how to do this by placing a callback function in the .each():
  $('pre code').each();

  // TODO (COMPLETED): Show our export field, and export the new article as JSON, so it's ready to copy/paste into blogArticles.js:
  $('#article-json').val(JSON.stringify(article));
};

// COMMENT: Where is this function called? Why?
// This function is called on our index.html page to initialize the index page.
articleView.initIndexPage = () => {
  articles.forEach(article => $('#articles').append(article.toHtml()));
  articleView.populateFilters();
  articleView.handleCategoryFilter();
  articleView.handleAuthorFilter();
  articleView.handleMainNav();
  articleView.setTeasers();
};
