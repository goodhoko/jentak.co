jQuery(document).ready(function(){
    var converter = new showdown.Converter();
    jQuery.get('resume.md', function(resumeMarkdown) {
        var html = converter.makeHtml(resumeMarkdown)
        jQuery('.content').html(html)
    })

    jQuery('.toggle').click(function(e) {
        var b = jQuery(document.body)
        b.attr('class', b.hasClass('pale') ? 'dark' : 'pale')
    })
})
