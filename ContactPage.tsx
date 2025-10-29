import React, { useEffect } from 'react';

const ContactPage: React.FC = () => {
  useEffect(() => {
    // This effect hook runs the Zoho script once the component mounts.
    // It creates a script tag and appends it to the body, which then
    // finds the target div and injects the form iframe.
    const script = document.createElement('script');
    script.type = 'text/javascript';
    
    const zohoScript = `
      (function() {
        try{
          var f = document.createElement("iframe");
          
          var ifrmSrc = 'https://forms.zohopublic.com/supportrev1/form/ContactUs/formperma/sPvtCNsVrY47427LwfCisC6e8uA5AxKnzm-VDRa27vo?zf_rszfm=1';
          
          try{
            if ( typeof ZFAdvLead != "undefined" && typeof zfutm_zfAdvLead != "undefined" ) {
              for( var prmIdx = 0 ; prmIdx < ZFAdvLead.utmPNameArr.length ; prmIdx ++ ) {
                  var utmPm = ZFAdvLead.utmPNameArr[ prmIdx ];
                  utmPm = ( ZFAdvLead.isSameDomian && ( ZFAdvLead.utmcustPNameArr.indexOf(utmPm) == -1 ) ) ? "zf_" + utmPm : utmPm;
                  var utmVal = zfutm_zfAdvLead.zfautm_gC_enc( ZFAdvLead.utmPNameArr[ prmIdx ] );
                  if ( typeof utmVal !== "undefined" ) {
                    if ( utmVal != "" ) {
                      if(ifrmSrc.indexOf('?') > 0){
                           ifrmSrc = ifrmSrc+'&'+utmPm+'='+utmVal;
                      }else{
                          ifrmSrc = ifrmSrc+'?'+utmPm+'='+utmVal;
                      }
                    }
                  }
              }
            }
            if ( typeof ZFLead !== "undefined" && typeof zfutm_zfLead !== "undefined" ) {
              for( var prmIdx = 0 ; prmIdx < ZFLead.utmPNameArr.length ; prmIdx ++ ) {
                    var utmPm = ZFLead.utmPNameArr[ prmIdx ];
                    var utmVal = zfutm_zfLead.zfutm_gC_enc( ZFLead.utmPNameArr[ prmIdx ] );
                    if ( typeof utmVal !== "undefined" ) {
                      if ( utmVal != "" ){
                        if(ifrmSrc.indexOf('?') > 0){
                          ifrmSrc = ifrmSrc+'&'+utmPm+'='+utmVal;//No I18N
                        }else{
                          ifrmSrc = ifrmSrc+'?'+utmPm+'='+utmVal;//No I18N
                        }
                      }
                    }
                  }
            }
          }catch(e){}
          
          f.src = ifrmSrc;
          f.style.border="none";
          f.style.height="904px";
          f.style.width="90%";
          f.style.transition="all 0.5s ease";
          f.setAttribute("aria-label", 'Contact Us');
          
          var d = document.getElementById("zf_div_sPvtCNsVrY47427LwfCisC6e8uA5AxKnzm-VDRa27vo");
          if(d) {
            d.innerHTML = ''; // Clear the div to avoid duplicates on re-render
            d.appendChild(f);
          }

          window.addEventListener('message', function (event){
            var evntData = event.data;
            if( evntData && evntData.constructor == String ){
              var zf_ifrm_data = evntData.split("|");
              if ( zf_ifrm_data.length == 2 || zf_ifrm_data.length == 3 ) {
                var zf_perma = zf_ifrm_data[0];
                var zf_ifrm_ht_nw = ( parseInt(zf_ifrm_data[1], 10) + 15 ) + "px";
                var iframe = document.getElementById("zf_div_sPvtCNsVrY47427LwfCisC6e8uA5AxKnzm-VDRa27vo").getElementsByTagName("iframe")[0];
                if ( iframe && (iframe.src).indexOf('formperma') > 0 && (iframe.src).indexOf(zf_perma) > 0 ) {
                  var prevIframeHeight = iframe.style.height;
                  var zf_tout = false;
                  if( zf_ifrm_data.length == 3 ) {
                      iframe.scrollIntoView();
                      zf_tout = true;
                  }

                  if ( prevIframeHeight != zf_ifrm_ht_nw ) {
                    if( zf_tout ) {
                        setTimeout(function(){
                            iframe.style.height = zf_ifrm_ht_nw;
                        },500);
                    } else {
                        iframe.style.height = zf_ifrm_ht_nw;
                    }
                  }
                }
              }
            }
          }, false);
        }catch(e){}
      })();
    `;
    
    script.appendChild(document.createTextNode(zohoScript));
    document.body.appendChild(script);

    return () => {
      // Cleanup the script and the form when the component unmounts
      document.body.removeChild(script);
      const formDiv = document.getElementById("zf_div_sPvtCNsVrY47427LwfCisC6e8uA5AxKnzm-VDRa27vo");
      if(formDiv) {
        formDiv.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="py-16 sm:py-24 bg-gray-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-base font-semibold text-indigo-400 tracking-wide uppercase">Contact Us</h2>
          <p className="mt-1 text-4xl font-extrabold text-white sm:text-5xl">
            Get in Touch
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-300">
            We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
          </p>
        </div>

        <div id="zf_div_sPvtCNsVrY47427LwfCisC6e8uA5AxKnzm-VDRa27vo" className="flex justify-center">
            {/* Zoho form iframe will be embedded here by the script */}
        </div>

      </div>
    </div>
  );
};

export default ContactPage;
