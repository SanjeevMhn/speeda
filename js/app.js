const accordions = document.querySelectorAll('.accordion-item');
const accordionHeader = document.querySelectorAll('.accordion-header');

accordionHeader.forEach((ah)=>{
    ah.addEventListener('click',function(){
        if(ah.style.borderTop == ''){
            ah.style.borderTop = "1px solid #A5A5A5";
        }
        if(!ah.parentElement.classList.contains('open')){
            ah.parentElement.classList.add('open');
            
            accordions.forEach((ap,index,arr)=>{
                let count = 0;
                let itemArr = Array.from(arr);
                if(ap.classList.contains('open')){
                    count++;
                }
                
                if(count > 0){
                    let bArr = itemArr.slice(0,index);
                    let aArr = itemArr.slice(index+1,itemArr.length);
                    let remArr = [...bArr,...aArr];
                    remArr.forEach((rm)=>{
                        rm.style.display = "none";
                    })
                }
            })  
        }else{
            ah.parentElement.classList.remove('open');
            ah.style.borderTop = '';
            accordions.forEach(ap => {
                ap.style.display = "block";
            })
        }
              
    })
})

const stickyNav = document.querySelector('.sticky-nav');
const backTop = document.querySelector('.to-top');
console.log(stickyNav);
console.log(window.scrollY);
document.addEventListener('scroll',function(e){
    if(window.scrollY > 100){
        stickyNav.style.top = 0;
        backTop.style.opacity = 0.7;
    }else{
        stickyNav.style.top = -80 + "px";
        backTop.style.opacity = 0;
    }
})