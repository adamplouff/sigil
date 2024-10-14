<script lang="ts">
  import { fade } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher();

  import Button from "./Button.svelte";

  export let app = 'AEFT'
  export let hostName = ''
  export let name = 'After Effects'
  export let buttonSize = '36px'
  export let column = false
  export let mini = false
  export let open = true
  export let beta = { AEFT: 100, ILST: 100 }

  const toggle = () => {
    dispatch('click')
  }

  export const compareVersions = (a: string, b: string): 'newer' | 'older' | 'same' => {
    const aArr = a.split('.').map(Number)
    const bArr = b.split('.').map(Number)

    for (let i = 0; i < 3; i++) {
      if (aArr[i] < bArr[i]) {
        return 'older'
      } else if (aArr[i] > bArr[i]) {
        return 'newer'
      }
    }
    return 'same'
  }
  const appIcons = {
    AEFT: `<svg style="width: 100%; height: 100%" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg"> <g filter="url(#filter0_d_484_88)"> <path d="M6 36.4C6 25.759 6 20.4385 8.07088 16.3742C9.89247 12.7991 12.7991 9.89247 16.3742 8.07088C20.4385 6 25.759 6 36.4 6H59.6C70.241 6 75.5615 6 79.6258 8.07088C83.2009 9.89247 86.1075 12.7991 87.9291 16.3742C90 20.4385 90 25.759 90 36.4V59.6C90 70.241 90 75.5615 87.9291 79.6258C86.1075 83.2009 83.2009 86.1075 79.6258 87.9291C75.5615 90 70.241 90 59.6 90H36.4C25.759 90 20.4385 90 16.3742 87.9291C12.7991 86.1075 9.89247 83.2009 8.07088 79.6258C6 75.5615 6 70.241 6 59.6V36.4Z" fill="#00005B"/> </g> <path d="M41.368 58.6915H28.3512L25.7028 67.1457C25.6292 67.4592 25.3406 67.6813 25.0265 67.6659H18.4336C18.0576 67.6659 17.9262 67.454 18.0392 67.0302L29.3091 33.8779C29.4219 33.5312 29.5345 33.1922 29.6473 32.7488C29.7947 31.9777 29.8702 31.1939 29.8727 30.4082C29.8404 30.176 30.0407 29.9704 30.2671 30.0035H39.2267C39.4892 30.0035 39.6394 30.0999 39.6775 30.2926L52.4691 67.0879C52.5817 67.4735 52.4689 67.6662 52.1309 67.6659H44.8053C44.5484 67.6951 44.303 67.519 44.2418 67.2613L41.368 58.6915ZM30.3798 51.5631H39.2831C37.8203 46.5646 36.1695 41.6318 34.8315 36.5943C33.3153 41.8198 31.9153 46.6659 30.3798 51.5631Z" fill="#9999FF"/> <path d="M61.9825 55.4271C62.5005 59.7199 66.1052 61.7664 70.0969 61.6792C72.3477 61.6349 74.7532 61.2856 76.8563 60.4344C77.0437 60.281 77.1381 60.3767 77.1381 60.7235V66.214C77.1558 66.4996 77.0365 66.7548 76.7999 66.9075C74.1859 68.095 71.1851 68.453 68.35 68.4076C59.8965 68.4076 54.0911 62.4513 54.0935 53.7855C54.0714 45.5733 59.399 38.645 67.6737 38.645C74.6879 38.4632 79.544 44.0791 79.5636 51.0692C79.5636 52.3423 79.4926 53.6198 79.3382 54.8836C79.3083 55.144 79.0866 55.3461 78.831 55.346C73.229 55.346 67.5998 55.4271 61.9825 55.4271ZM61.9825 50.1621C65.1044 50.1621 68.2445 50.2725 71.3646 50.1332C71.8336 50.0852 72.1819 49.9963 72.1819 49.5086C72.1167 46.9172 69.9298 44.7859 67.3921 44.8851C64.3259 44.695 62.3636 47.2832 61.9825 50.1621Z" fill="#9999FF"/> <defs> <filter id="filter0_d_484_88" x="2" y="3" width="92" height="92" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"> <feFlood flood-opacity="0" result="BackgroundImageFix"/> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/> <feOffset dy="1"/> <feGaussianBlur stdDeviation="2"/> <feComposite in2="hardAlpha" operator="out"/> <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/> <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_484_88"/> <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_484_88" result="shape"/> </filter> </defs> </svg>`,
    AEFT_beta: `<svg style="width: 100%; height: 100%" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg"> <g filter="url(#filter0_d_484_91)"> <path d="M6 36.4C6 25.759 6 20.4385 8.07088 16.3742C9.89247 12.7991 12.7991 9.89247 16.3742 8.07088C20.4385 6 25.759 6 36.4 6H59.6C70.241 6 75.5615 6 79.6258 8.07088C83.2009 9.89247 86.1075 12.7991 87.9291 16.3742C90 20.4385 90 25.759 90 36.4V59.6C90 70.241 90 75.5615 87.9291 79.6258C86.1075 83.2009 83.2009 86.1075 79.6258 87.9291C75.5615 90 70.241 90 59.6 90H36.4C25.759 90 20.4385 90 16.3742 87.9291C12.7991 86.1075 9.89247 83.2009 8.07088 79.6258C6 75.5615 6 70.241 6 59.6V36.4Z" fill="#EAEAEA"/> </g> <line x1="27.5" y1="6" x2="27.5" y2="90" stroke="#A4C2E6" stroke-opacity="0.4"/> <line x1="48.5" y1="6" x2="48.5" y2="90" stroke="#A4C2E6" stroke-opacity="0.4"/> <line x1="69.5" y1="6" x2="69.5" y2="90" stroke="#A4C2E6" stroke-opacity="0.4"/> <line x1="90" y1="27.5" x2="6" y2="27.5" stroke="#A4C2E6" stroke-opacity="0.4"/> <line x1="90" y1="48.5" x2="6" y2="48.5" stroke="#A4C2E6" stroke-opacity="0.4"/> <line x1="90" y1="69.5" x2="6" y2="69.5" stroke="#A4C2E6" stroke-opacity="0.4"/> <path d="M41.368 58.6915H28.3512L25.7028 67.1457C25.6292 67.4592 25.3406 67.6813 25.0265 67.6659H18.4336C18.0576 67.6659 17.9262 67.454 18.0392 67.0302L29.3091 33.8779C29.4219 33.5312 29.5345 33.1922 29.6473 32.7488C29.7947 31.9777 29.8702 31.1939 29.8727 30.4082C29.8404 30.176 30.0407 29.9704 30.2671 30.0035H39.2267C39.4892 30.0035 39.6394 30.0999 39.6775 30.2926L52.4691 67.0879C52.5817 67.4735 52.4689 67.6662 52.1309 67.6659H44.8053C44.5484 67.6951 44.303 67.519 44.2418 67.2613L41.368 58.6915ZM30.3798 51.5631H39.2831C37.8203 46.5646 36.1695 41.6318 34.8315 36.5943C33.3153 41.8198 31.9153 46.6659 30.3798 51.5631Z" fill="#1473E6"/> <path d="M61.9825 55.4271C62.5005 59.7199 66.1052 61.7664 70.0969 61.6792C72.3477 61.6349 74.7532 61.2856 76.8563 60.4344C77.0437 60.281 77.1381 60.3767 77.1381 60.7235V66.214C77.1558 66.4996 77.0365 66.7548 76.7999 66.9075C74.1859 68.095 71.1851 68.453 68.35 68.4076C59.8965 68.4076 54.0911 62.4513 54.0935 53.7855C54.0714 45.5733 59.399 38.645 67.6737 38.645C74.6879 38.4632 79.544 44.0791 79.5636 51.0692C79.5636 52.3423 79.4926 53.6198 79.3382 54.8836C79.3083 55.144 79.0866 55.3461 78.831 55.346C73.229 55.346 67.5998 55.4271 61.9825 55.4271ZM61.9825 50.1621C65.1044 50.1621 68.2445 50.2725 71.3646 50.1332C71.8336 50.0852 72.1819 49.9963 72.1819 49.5086C72.1167 46.9172 69.9298 44.7859 67.3921 44.8851C64.3259 44.695 62.3636 47.2832 61.9825 50.1621Z" fill="#1473E6"/> <defs> <filter id="filter0_d_484_91" x="2" y="3" width="92" height="92" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"> <feFlood flood-opacity="0" result="BackgroundImageFix"/> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/> <feOffset dy="1"/> <feGaussianBlur stdDeviation="2"/> <feComposite in2="hardAlpha" operator="out"/> <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/> <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_484_91"/> <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_484_91" result="shape"/> </filter> </defs> </svg>`,
    ILST: `<svg style="width: 100%; height: 100%" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg"> <g filter="url(#filter0_d_484_94)"> <path d="M6 36.4C6 25.759 6 20.4385 8.07088 16.3742C9.89247 12.7991 12.7991 9.89247 16.3742 8.07088C20.4385 6 25.759 6 36.4 6H59.6C70.241 6 75.5615 6 79.6258 8.07088C83.2009 9.89247 86.1075 12.7991 87.9291 16.3742C90 20.4385 90 25.759 90 36.4V59.6C90 70.241 90 75.5615 87.9291 79.6258C86.1075 83.2009 83.2009 86.1075 79.6258 87.9291C75.5615 90 70.241 90 59.6 90H36.4C25.759 90 20.4385 90 16.3742 87.9291C12.7991 86.1075 9.89247 83.2009 8.07088 79.6258C6 75.5615 6 70.241 6 59.6V36.4Z" fill="#330000"/> </g> <path d="M46.7052 58.7888H33.6884L31.04 67.2269C30.9664 67.5404 30.6777 67.7624 30.3637 67.747H23.7708C23.3948 67.747 23.2633 67.5351 23.3763 67.1113L34.6463 33.8214C34.759 33.4747 34.8718 33.0798 34.9845 32.6366C35.1319 31.8655 35.2073 31.0818 35.2099 30.296C35.1776 30.0639 35.3816 29.8588 35.6043 29.8914H44.5638C44.8263 29.8914 44.9766 29.9877 45.0147 30.1804L57.8063 67.169C57.9189 67.5546 57.8061 67.7473 57.468 67.747H50.1425C49.8855 67.7762 49.6402 67.6001 49.579 67.3425L46.7052 58.7888ZM35.7169 51.5067H44.6202C43.1575 46.5081 41.5066 41.5753 40.1687 36.5378C38.7251 41.5838 37.1501 46.6094 35.7169 51.5067Z" fill="#FF9A00"/> <path d="M65.4128 36.0175C64.838 36.0411 64.2649 35.9401 63.7308 35.721C63.1967 35.5019 62.7138 35.1697 62.3135 34.746C61.9143 34.3039 61.6043 33.7853 61.4012 33.22C61.1981 32.6546 61.1059 32.0537 61.13 31.4517C61.1096 30.8556 61.2119 30.2619 61.4304 29.7091C61.6488 29.1564 61.9785 28.6572 62.3979 28.244C62.8133 27.8352 63.3035 27.5148 63.8403 27.3016C64.3771 27.0883 64.9499 26.9863 65.5254 27.0015C66.8779 27.0015 67.9391 27.4157 68.7092 28.244C69.0979 28.6745 69.4 29.1795 69.5982 29.7299C69.7964 30.2803 69.8869 30.8654 69.8643 31.4517C69.8879 32.056 69.7928 32.6591 69.5846 33.225C69.3765 33.7909 69.0596 34.3081 68.6528 34.746C68.2276 35.1759 67.7202 35.5108 67.1626 35.7296C66.6049 35.9485 66.0091 36.0465 65.4128 36.0175ZM61.5245 67.1688V39.5429C61.5245 39.1962 61.6742 39.0227 61.9753 39.0227H68.9064C69.2067 39.0227 69.357 39.1961 69.3573 39.5429V67.1688C69.3573 67.5545 69.207 67.7471 68.9064 67.7468H62.0317C61.6937 67.7468 61.5246 67.5542 61.5245 67.1688Z" fill="#FF9A00"/> <defs> <filter id="filter0_d_484_94" x="2" y="3" width="92" height="92" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"> <feFlood flood-opacity="0" result="BackgroundImageFix"/> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/> <feOffset dy="1"/> <feGaussianBlur stdDeviation="2"/> <feComposite in2="hardAlpha" operator="out"/> <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/> <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_484_94"/> <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_484_94" result="shape"/> </filter> </defs> </svg>`,
    ILST_beta: `<svg style="width: 100%; height: 100%" viewBox="0 0 96 98" fill="none" xmlns="http://www.w3.org/2000/svg"> <g filter="url(#filter0_d_484_97)"> <g filter="url(#filter1_d_484_97)"> <path d="M6 36.4C6 25.759 6 20.4385 8.07088 16.3742C9.89247 12.7991 12.7991 9.89247 16.3742 8.07088C20.4385 6 25.759 6 36.4 6H59.6C70.241 6 75.5615 6 79.6258 8.07088C83.2009 9.89247 86.1075 12.7991 87.9291 16.3742C90 20.4385 90 25.759 90 36.4V59.6C90 70.241 90 75.5615 87.9291 79.6258C86.1075 83.2009 83.2009 86.1075 79.6258 87.9291C75.5615 90 70.241 90 59.6 90H36.4C25.759 90 20.4385 90 16.3742 87.9291C12.7991 86.1075 9.89247 83.2009 8.07088 79.6258C6 75.5615 6 70.241 6 59.6V36.4Z" fill="#EAEAEA"/> </g> <line x1="27.5" y1="6" x2="27.5" y2="90" stroke="#A4C2E6" stroke-opacity="0.4"/> <line x1="48.5" y1="6" x2="48.5" y2="90" stroke="#A4C2E6" stroke-opacity="0.4"/> <line x1="69.5" y1="6" x2="69.5" y2="90" stroke="#A4C2E6" stroke-opacity="0.4"/> <line x1="90" y1="27.5" x2="6" y2="27.5" stroke="#A4C2E6" stroke-opacity="0.4"/> <line x1="90" y1="48.5" x2="6" y2="48.5" stroke="#A4C2E6" stroke-opacity="0.4"/> <line x1="90" y1="69.5" x2="6" y2="69.5" stroke="#A4C2E6" stroke-opacity="0.4"/> <path d="M46.7052 58.7888H33.6884L31.04 67.2269C30.9664 67.5404 30.6777 67.7624 30.3637 67.747H23.7708C23.3948 67.747 23.2633 67.5351 23.3763 67.1113L34.6463 33.8214C34.759 33.4747 34.8718 33.0798 34.9845 32.6366C35.1319 31.8655 35.2073 31.0818 35.2099 30.296C35.1776 30.0639 35.3816 29.8588 35.6043 29.8914H44.5638C44.8263 29.8914 44.9766 29.9877 45.0147 30.1804L57.8063 67.169C57.9189 67.5546 57.8061 67.7473 57.468 67.747H50.1425C49.8855 67.7762 49.6402 67.6001 49.579 67.3425L46.7052 58.7888ZM35.7169 51.5067H44.6202C43.1575 46.5081 41.5066 41.5753 40.1687 36.5378C38.7251 41.5838 37.1501 46.6094 35.7169 51.5067Z" fill="#1473E6"/> <path d="M65.4128 36.0175C64.838 36.0411 64.2649 35.9401 63.7308 35.721C63.1967 35.5019 62.7138 35.1697 62.3135 34.746C61.9143 34.3039 61.6043 33.7853 61.4012 33.22C61.1981 32.6546 61.1059 32.0537 61.13 31.4517C61.1096 30.8556 61.2119 30.2619 61.4304 29.7091C61.6488 29.1564 61.9785 28.6572 62.3979 28.244C62.8133 27.8352 63.3035 27.5148 63.8403 27.3016C64.3771 27.0883 64.9499 26.9863 65.5254 27.0015C66.8779 27.0015 67.9391 27.4157 68.7092 28.244C69.0979 28.6745 69.4 29.1795 69.5982 29.7299C69.7964 30.2803 69.8869 30.8654 69.8643 31.4517C69.8879 32.056 69.7928 32.6591 69.5846 33.225C69.3765 33.7909 69.0596 34.3081 68.6528 34.746C68.2276 35.1759 67.7202 35.5108 67.1626 35.7296C66.6049 35.9485 66.0091 36.0465 65.4128 36.0175ZM61.5245 67.1688V39.5429C61.5245 39.1962 61.6742 39.0227 61.9753 39.0227H68.9064C69.2067 39.0227 69.357 39.1961 69.3573 39.5429V67.1688C69.3573 67.5545 69.207 67.7471 68.9064 67.7468H62.0317C61.6937 67.7468 61.5246 67.5542 61.5245 67.1688Z" fill="#1473E6"/> </g> <defs> <filter id="filter0_d_484_97" x="-4" y="0" width="104" height="104" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"> <feFlood flood-opacity="0" result="BackgroundImageFix"/> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/> <feOffset dy="4"/> <feGaussianBlur stdDeviation="2"/> <feComposite in2="hardAlpha" operator="out"/> <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/> <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_484_97"/> <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_484_97" result="shape"/> </filter> <filter id="filter1_d_484_97" x="2" y="3" width="92" height="92" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"> <feFlood flood-opacity="0" result="BackgroundImageFix"/> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/> <feOffset dy="1"/> <feGaussianBlur stdDeviation="2"/> <feComposite in2="hardAlpha" operator="out"/> <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/> <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_484_97"/> <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_484_97" result="shape"/> </filter> </defs> </svg>`,
    FIGMA: `<svg style="width: 100%; height: 100%" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg"> <g filter="url(#filter0_d_449_76)"> <rect x="6" y="6" width="84" height="84" rx="18" fill="#141414"/> </g> <g clip-path="url(#clip0_449_76)"> <path d="M48 48C48 43.4445 51.7668 39.7515 56.4135 39.7515C61.06 39.7515 64.8269 43.4445 64.8269 48C64.8269 52.5555 61.06 56.2485 56.4135 56.2485C51.7668 56.2485 48 52.5555 48 48Z" fill="#00B5FF"/> <path d="M31.1731 64.497C31.1731 59.9416 34.9399 56.2485 39.5866 56.2485H48V64.497C48 69.0526 44.2332 72.7455 39.5866 72.7455C34.9399 72.7455 31.1731 69.0526 31.1731 64.497Z" fill="#00D46C"/> <path d="M48 23.2545V39.7515H56.4135C61.0601 39.7515 64.8269 36.0585 64.8269 31.503C64.8269 26.9475 61.0601 23.2545 56.4135 23.2545H48Z" fill="#FF600A"/> <path d="M31.1731 31.503C31.1731 36.0585 34.9399 39.7515 39.5866 39.7515H48V23.2545H39.5866C34.9399 23.2545 31.1731 26.9475 31.1731 31.503Z" fill="#FF0021"/> <path d="M31.1731 48C31.1731 52.5555 34.9399 56.2485 39.5866 56.2485H48V39.7515H39.5866C34.9399 39.7515 31.1731 43.4445 31.1731 48Z" fill="#8C47FF"/> </g> <defs> <filter id="filter0_d_449_76" x="2" y="3" width="92" height="92" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"> <feFlood flood-opacity="0" result="BackgroundImageFix"/> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/> <feOffset dy="1"/> <feGaussianBlur stdDeviation="2"/> <feComposite in2="hardAlpha" operator="out"/> <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/> <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_449_76"/> <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_449_76" result="shape"/> </filter> <clipPath id="clip0_449_76"> <rect width="34" height="50" fill="white" transform="translate(31 23)"/> </clipPath> </defs> </svg>`
  }
  $: hostIcon = appIcons[app] || appIcons['AEFT']

  let showName = false
  $: {
    console.log(hostName, open);    // for the responsive update
    showName = open

    setTimeout(() => {
      showName = false
    }, 600);

    if (app === 'AEFT' || app === 'ILST') {
      const appVersion = name.replace(`${app}-`, '')

      if (compareVersions(appVersion, beta[app]) !== 'older') app = `${app}_beta`
    }
  }
</script>

<div
  class="collapsicon"
  class:column
  >
  <!-- icon -->
  <Button width={buttonSize} height={buttonSize} flat tooltip={name} on:click={toggle} nonclickable={open}>
    <div class="icon-wrapper" class:mini={!open} >
    <!-- style={ `width: ${buttonSize}; height: ${buttonSize}`} -->
      <!-- <div class="mini-text">{ name.slice(0, 6) }</div> -->
      <div class="mini-text">{ name }</div>
      <div class="host-icon">
        {@html hostIcon}
      </div>
    </div>
  </Button>

  {#if showName}
  <div class="name-overlay visible" class:column out:fade={{delay: 100, duration: 200}} >
    {name}
  </div>
  {/if}

  <!-- nested buttons -->
  <div class="hide" class:show={open}>
    <slot/>
  </div>

  <div class="show-more" class:hide={open} class:column>
    <svg viewBox="0 0 128 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 96L92 260L32 424" stroke-width="32"/>
    </svg>
  </div>



</div>

<style>
  :global(.collapsicon .button, .collapsicon .button-content) {
    white-space: normal !important;
  }
  .collapsicon {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: start;
    gap: 4px;
    box-sizing: content-box;
    /* width: fit-content; */
    /* border: 1px solid rgba(0, 0, 0, 0); */
  }
  .collapsicon.column {
    flex-direction: column;
  }
  .icon-wrapper {
    /* overflow: hidden; */
    display: flex;
    justify-content: start;
    align-items: start;
    width: 38px;
    height: 38px;

  }
  .icon-wrapper > * {
    transition: all 0.17s;
  }
  .host-icon {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    gap: 4px;
    white-space: normal;
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;

  }
  .mini > .host-icon {
    bottom: -2px;
    right: -2px;
    width: 20px;
    height: 20px;
    border-radius: 2px;
    box-sizing: border-box;
    /* border: 1px solid var(--button-color);; */
    /* border: 1px solid rgba(0, 0, 0, 0.3); */
  }
  .mini > .mini-text {
    opacity: 0.7;
  }
  .mini-text {
    position: relative;
    text-transform: uppercase;
    overflow-wrap: anywhere;
    text-align: start;
    font-size: 12px;
    line-height: 13px;
    height: 100%;
    width: 44px;
    max-height: 28px;
    opacity: 0;
    margin-top: -1px;
    overflow: hidden;
    padding-left: 2px;
  }
  .show-more {
    display: flex;
    justify-content: center;
    align-items: center;
    fill: var(--button-color);
    stroke: var(--button-color);
    opacity: 0.5;
    /* width: 6px;
    height: 36px; */
    /* transform-origin: 50% 50%; */
  }
  .show-more > svg {
    width: 6px;
    height: 36px;
    opacity: 0.7;
  }
  .show-more.column > svg {
    /* transform-origin: 50% 100%; */
    transform: rotate(90deg) translate(-14px, -16px)
  }
  .show-more.column {
    max-height: 6px;
    display: block;
  }

  .name-overlay {
    position: absolute;
    color: var(--tooltip-color);
    background-color: var(--tooltip-bg);
    padding: 1px 2px;
    z-index: 10;
    margin-left: 38px;
    pointer-events: none;
    transform-origin: top left;
    line-break: loose;
    hyphens: auto;
    /* margin-left: 50%; */
  }
  .name-overlay.column {
    margin-left: 4px;
    margin-top: 38px;
    max-width: 48px;
    text-align: start;
    /* width: min-content; */
    /* margin-right: 4px;
    margin-top: 38px; */
    /* transform: rotate(90deg); */
  }

  .hide {
    display: none;
  }
  .show {
    display: contents;
  }
</style>
