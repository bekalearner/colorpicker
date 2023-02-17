'use strict'

window.addEventListener('DOMContentLoaded', () => {

   // DOM elements

   const colorBlocks = document.querySelectorAll('.col')

   //Functions

   // const generateRandomColor = function(){
   //    const HEXCodes = '0123456789ABCDEF';
   //    let color = '';

   //    for (let i = 0; i < 6; i++){
   //       color += HEXCodes[Math.floor(Math.random() * HEXCodes.length)]
   //    }

   //    return '#' + color
   // }
   const setColorText = function (text, color){
      const luminance = chroma(color).luminance()

      text.style.color = luminance > 0.5 ? 'black' : 'white'
   }

   const updateColorsHash = function (array = []){
      document.location.hash = array.map(col => col.toString().substring(1)).join('-');
   }

   const getColorsFromHash = function (){
      if (document.location.hash.length > 1) {
         return document.location.hash.substring(1).split('-').map(color => '#' + color)
      }else {
         return []
      }
   }

   const setRundomColor = function (isInitial){
      const colors = isInitial ? getColorsFromHash() : [];

      colorBlocks.forEach( (column, index) => {
         const isLocked = column.querySelector('i').classList.contains('fa-lock')
         const columnText = column.querySelector('h2')
         const lockButton = column.querySelector('button')
         const copiedHint = column.querySelector('p');
         
         if (isLocked){
            colors.push(columnText.textContent)
            return
         }

         const color = isInitial 
         ? colors[index]
            ?colors[index]
            :chroma.random()
         : chroma.random()

         if (!isInitial){
            colors.push(color)
         }

         column.style.background = color
         columnText.textContent = color

         setColorText(columnText, color)
         setColorText(lockButton, color)
         setColorText(copiedHint, color)
      })

      updateColorsHash(colors);

   }

   const copyToClipboard = function (text){
      return navigator.clipboard.writeText(text)
   }

   setRundomColor(true)

   document.addEventListener('keydown', event => {
      event.preventDefault();
      if( event.code.toLocaleLowerCase() === 'space'){
         setRundomColor();
      }
   })
   
   document.addEventListener('click', event =>{
      const type = event.target.dataset.type

      if(type === 'lock'){
         const node = 
            event.target.tagName.toLocaleLowerCase() === 'i'
               ? event.target
               : event.target.children[0]
         
         node.classList.toggle('fa-lock-open')
         node.classList.toggle('fa-lock')
         node.classList.toggle('locked')
      }else if( type === 'copy'){
         copyToClipboard(event.target.textContent);
      }
   })
})