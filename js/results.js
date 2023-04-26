import { results, mbtis } from './data.js'

// 주소 Query String에서 mbti 값 가져오기 http://127.0.0.1:5500/result.html?mbti=infj
const mbti = new URLSearchParams(location.search).get('mbti')
const result = results[mbtis[mbti]]

const titleEl = document.querySelector('.page-title')
const characterEl = document.querySelector('.character')
const boxEls = document.querySelectorAll('.box')
const jobEls = document.querySelectorAll('.job')
const lectureEl = document.querySelector('.lecture')
const lectureImgEl = document.querySelector('.lecture img')

titleEl.innerHTML = result.title
characterEl.src = result.character
boxEls.forEach(function(boxEl, index) {
    boxEl.innerHTML = result.results[index]
})
jobEls.forEach(function(jobEl, index) {
    jobEl.innerHTML = result.jobs[index]
})
lectureEl.href = result.lectureUrl
lectureImgEl.src = result.lectureImg