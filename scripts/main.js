'use strict';

/* HELPER: Checks Whether an Element Exists
----------------------------------------------------------------------------------------------------*/
(function( $ ) {

  $.fn.extend({
    exists: function() {
      if ( this.length > 0 ) {
        return true;
      } else {
        return false;
      }
    }
  });

})( jQuery );



jQuery(document).on("ready",function () {
    
});



const container = document.querySelector('.container');
        const sections = document.querySelectorAll('.section');
        let currentSection = 0;
        const sectionHeight = window.innerHeight;

        container.addEventListener('wheel', (event) => {
            event.preventDefault(); // Prevent default scrolling

            if (event.deltaY > 0) {
                // Scrolling down
                if (currentSection < sections.length - 1) {
                    currentSection++;
                }
            } else {
                // Scrolling up
                if (currentSection > 0) {
                    currentSection--;
                }
            }

            scrollToSection(currentSection);
        });

        function scrollToSection(index) {
            container.scrollTo({
                top: sectionHeight * index,
                behavior: 'smooth' // Optional: Add smooth scrolling animation
            });
        }

        // Optional: Handle keyboard navigation (Page Up/Down)
        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowDown' || event.key === 'PageDown') {
                event.preventDefault();
                if (currentSection < sections.length - 1) {
                    currentSection++;
                    scrollToSection(currentSection);
                }
            } else if (event.key === 'ArrowUp' || event.key === 'PageUp') {
                event.preventDefault();
                if (currentSection > 0) {
                    currentSection--;
                    scrollToSection(currentSection);
                }
            }
        });


$('.menu-btn-op').click(function(){
  $('.wrapper .main-menu').addClass('active-mn');
  $('.wrapper .main-menu').removeClass('active-mnx');
});

$('.menu-btn').click(function(){
  $('.wrapper .main-menu').addClass('active-mnx');
  $('.wrapper .main-menu').removeClass('active-mn');
});


const boxes = document.querySelectorAll('.box');

        boxes.forEach(box => {
            box.addEventListener('mouseover', function() {
                boxes.forEach(b => b.classList.remove('active'));

                this.classList.add('active');
            });

            
        });


       function scrollToDiv(divId) {
      const targetElement = document.getElementById(divId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      } else {
        console.error(`Div with id '${divId}' not found.`);
      }
    }

    $('.section-2 .owl-carousel').owlCarousel({
        loop:true,
        margin:0,
        nav:true,
        dots:false,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
    })