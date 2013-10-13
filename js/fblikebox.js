/**
 * fblikebox v1.0
 * 
 * parametry wymagane:
 *   url - adres do fan page
 * parametry opcjonalne:
 *   width/height - szerokosc i wysokosc bloczka
 *   showFaces    - czy wyswietlac twarze
 *   dataStream   - czy wyswietlac wpisy ze strony
 *   lang         - jezyk w ktorym ma sie wyswietlac bloczek
 *   duration     - szybkosc animacji
 *   
 */
(function( $ ){
    $.fn.fblikebox = function( options )
    {
        options = $.extend( {
            width: 240,
            height: 380,
            showFaces: true,
            dataStream: false,
            dataHeader: false,
            lang: 'pl_PL',
            duration: 300
        }, options );

        var sriptJs = document.getElementsByTagName('script')[0],
            boxWidth, scriptEl, html;

        html = '<div class="fblikebox" style="width: '+( options.width + 46 )+'px; height: '+options.height+'px; margin-top: -'+( Math.round( options.height / 2 ) )+'px; right: -'+options.width+'px;">';
            html += '<div class="fblikebox-btn"><a href="#"></a></div>';
            html += '<div class="fb-like-box" ';
            html += 'data-width="'+options.width.toString()+'" data-height="'+options.height.toString()+'" ';
            html += 'data-show-faces="'+( options.showFaces ? 'true' : 'false' )+'" ';
            html += 'data-stream="'+( options.dataStream ? 'true' : 'false' )+'" ';
            html += 'data-header="'+( options.dataHeader ? 'true' : 'false' )+'" ';

            if ( 'undefined' != typeof options.dataBorderColor ) {
                html += 'data-border-color="'+options.dataBorderColor+'" ';
            }

            html += 'data-href="'+options.url+'"></div>';
        html += '</div>';
        $( this ).append( html );

        // #fb-root
        if ( ! $( '#fb-root' ).length ) {
            $( 'body' ).append( '<div id="fb-root"></div>' );
        }

        // #facebook -jssdk
        if ( ! $( '#facebook-jssdk' ).length ) {
            scriptEl = document.createElement( 'script' );
            scriptEl.id = 'facebook-jssdk';
            scriptEl.src = 'http://connect.facebook.net/'+options.lang+'/all.js#xfbml=1';

            sriptJs.parentNode.insertBefore( scriptEl, sriptJs );
        } // endif

        
        $( '.fblikebox-btn' ).click( function( e ) {
            e.stopPropagation();
            e.preventDefault();

            if ( 'undefined' == typeof boxWidth ) {
                boxWidth = parseInt( $( '.fb-like-box' ).width(), 10 );
            }

            $( '.fblikebox' )
                .toggleClass( 'showed' )
                .animate( {
                    right: ( $( '.fblikebox' ).hasClass( 'showed' ) ? 0 : -boxWidth )
                }, options.duration );
        } );
        

        return this;
    }; // fbsubscribe

})( jQuery );
