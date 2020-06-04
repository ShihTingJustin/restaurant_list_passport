//刪除前再次確認
function deleteCheckAgain() {
  return window.confirm('Do you really want to delete this restaurant ?')
}

function editCheckAgain() {
  return window.confirm('Do you really want to send these information ?')
}

const pathname = window.location.pathname
if (pathname === '/search') {
  const searchBar = document.querySelector('.search-bar')
  window.addEventListener('load', () => {
    //圖片載入完成才執行滑動
    searchBar.scrollIntoView({ behavior: 'smooth' })
  })
}

if (pathname.includes('/edit') || pathname.includes('/new')) {
  const container = document.querySelector('.container')
  window.addEventListener('load', () => {
    //圖片載入完成才執行滑動
    container.scrollIntoView({ behavior: 'smooth' })
  })
}

if (pathname.includes('/restaurants')) {
  const restaurantTitle = document.querySelector('.restaurant-show-title')
  window.addEventListener('load', () => {
    //圖片載入完成才執行滑動
    restaurantTitle.scrollIntoView({ behavior: 'smooth' })
  })
}

// const dropdownMenu = document.querySelector('.dropdown-menu')
// const dropdownBtn = document.querySelectorAll('.dropdown-btn')

// dropdownMenu.addEventListener('click', e => {
//   if (e.target.classList.contains('dropdown-item')) {
//     window.addEventListener('load', () => {
//       window.alert(123)
//       dropdownBtn.innerText = e.target.innerText
//       // e.target.classList.add('active')
//     })
//   }
// })

const selector = document.querySelector('.selector-title')
const nameAsc = document.querySelector('.sort-asc')
const nameDesc = document.querySelector('.sort-desc')
const ratingDesc = document.querySelector('.rating-desc')
const ratingAsc = document.querySelector('.rating-asc')

if (pathname.includes('/sort/name/asc')) {
  selector.insertBefore(nameAsc, selector.firstChild)
}

if (pathname.includes('/sort/name/desc')) {
  selector.insertBefore(nameDesc, selector.firstChild)
}

if (pathname.includes('/sort/rating/desc')) {
  selector.insertBefore(ratingDesc, selector.firstChild)
}

if (pathname.includes('/sort/rating/asc')) {
  selector.insertBefore(ratingAsc, selector.firstChild)
}

// function onFocus() {
//   document.querySelector('#blur').classList.add('blury')
//   console.log(123)
// }

// function onFocusOut() {
//   document.querySelector('#blur').classList.remove('blury')
//   console.log(321)
// }