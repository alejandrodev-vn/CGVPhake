(function ($)
{ "use strict"
    /*1. menu */ 
    $('#navbarToggler').click(()=>{
       if($('#dropdown').css('display') == 'none' || $('#dropdown').css('display') == ''){
            $('#dropdown').show(1000)
       } else $('#dropdown').hide(1000)
    });
    /* menu */ 
     /*2. searchOption */ 
     $('#typeOfMovie').click(()=>{
        if($('#searchOption').css('display') == 'none' || $('#searchOption').css('display') == ''){
             $('#searchOption').show(1000)
        } else $('#searchOption').hide(1000)
     });
    /* menu */
    $('.text-checkbox').toArray().forEach(e => {
      $(e).click(()=>{
         $(e).toggleClass('active')
       });
    })
    $('.seats input').toArray().forEach(e=>{
      $(e).click(()=>{
         $(e).parent().toggleClass('checked')
       });
    })
 

})(jQuery);