<script>
  import { onMount, createEventDispatcher } from 'svelte'
  import Button from './Button.svelte';
  import Input from "./Input.svelte";
  export let message = ''
  export let locale = 'en'
  export let locked = false

  const dispatch = createEventDispatcher();
  
  // onMount(() => {
  //   console.log('mount', licenseKey);
  //   if (licenseKey == '' || !licenseKey) {
  //     console.log('licenseKey', licenseKey);
  //     // no key in prefs, auto lock
  //     locked = true
  //   } else {
  //     // key is passed, so check with the server
  //     console.log('check the server');
  //   }
  // })

  let key = ''

  const lang = {
    'en': { },
    // Spanish
    'es': { },
    // Japanese
    'ja': { },
    // French
    'fr': { },
    // Italian
    'it': { },
    // Portuguese
    'pt': { },
    // Russian
    'ru': { },
    // German
    'de': { },
    // Chinese 
    'zh': { },
  }
  const _lang = lang[locale]

  //#region Authentication strings
  lang.en.authLabel = 'Be at rest upon the Sacred Mountain'
  lang.es.authLabel = 'Toma un descanso sobre la montaña sagrada'
  lang.pt.authLabel = 'Descanse na montanha sagrada'
  lang.ja.authLabel = '神聖なる山で安らぎなさい'
  lang.it.authLabel = 'Riposa sulla montagna sacra'
  lang.de.authLabel = 'Finde Ruhe auf dem heiligen Berg'
  lang.ru.authLabel = 'Переведи дух на священной горе'
  lang.zh.authLabel = '在圣山上安息'
  lang.fr.authLabel = 'Reposez-vous sur la montagne sacrée'

  lang.en.authPlaceholder = 'Paste license key'
  lang.es.authPlaceholder = 'Pegar código de licencia'
  lang.pt.authPlaceholder = 'Cole a chave de licença'
  lang.ja.authPlaceholder = 'ライセンスキーをペースト'
  lang.it.authPlaceholder = 'Incolla il tuo codice di licenza'
  lang.de.authPlaceholder = 'Lizenzschlüssel einfügen'
  lang.ru.authPlaceholder = 'Вставить лицензионный ключ'
  lang.zh.authPlaceholder = '粘贴你的许可证代码'
  lang.fr.authPlaceholder = `Coller la clé d'activation`

  lang.en.failed = 'This code is not valid. Try again.'
  lang.es.failed = 'Este código no es válido. Inténtalo de nuevo.'
  lang.pt.failed = 'Esta licença não é válida. Tente novamente.'
  lang.ja.failed = 'コードが無効です。再度試してください。'
  lang.it.failed = 'Codice non valido. Riprova.'
  lang.de.failed = 'Dieser Code ist nicht gültig – versuche es erneut'
  lang.ru.failed = 'Код недействителен. Попробуйте еще раз.'
  lang.zh.failed = '此代码无效。请重新尝试。'
  lang.fr.failed = `Le code est incorrect. Réessayez.`

  lang.en.refunded = 'This purchase was refunded'
  lang.es.refunded = 'Esta compra fue reembolsada'
  lang.pt.refunded = 'Esta compra foi reembolsada'
  lang.ja.refunded = 'この購入は返品されました。'
  lang.it.refunded = 'Il tuo acquisto è stato rimborsato'
  lang.de.refunded = 'Der Kauf wurde erstattet'
  lang.ru.refunded = 'Осуществлен возврат средств'
  lang.zh.refunded = '这笔购买已退款'
  lang.fr.refunded = `Cet achat a été remboursé`

  lang.en.chargebacked = 'This purchase was canceled with a chargeback'
  lang.es.chargebacked = 'Esta compra se canceló con un contracargo'
  lang.pt.chargebacked = 'Esta compra foi cancelada com um estorno'
  lang.ja.chargebacked = 'この購入はキャンセルされ返金されました。'
  lang.it.chargebacked = 'Il tuo acquisto è stato cancellato e riaddebitato'
  lang.de.chargebacked = 'Der Kauf wurde mit einer Rückbuchung storniert'
  lang.ru.chargebacked = 'Покупка отменена с возвратным платежом'
  lang.zh.chargebacked = '这笔购买已被取消并退款'
  lang.fr.chargebacked = 'Cet achat a été annulé et remboursé'

  lang.en.cantConnect = 'Unable to connect to authentication server'
  lang.es.cantConnect = 'No se puede conectar al servidor de autenticación'
  lang.pt.cantConnect = 'Não foi possível se conectar ao servidor de autenticação'
  lang.ja.cantConnect = '認証サーバーに接続できません。'
  lang.it.cantConnect = 'Impossibile connettersi al server di autenticazione'
  lang.de.cantConnect = 'Verbindung zum Authentifizierungsserver kann nicht hergestellt werden'
  lang.ru.cantConnect = 'Невозможно подключиться к серверу аутентификации'
  lang.zh.cantConnect = '无法连接到认证服务器'
  lang.fr.cantConnect = `Impossible de se connecter au serveur d'authentification`

  lang.en.loading = 'Loading...'
  lang.es.loading = 'Cargando...'
  lang.pt.loading = 'Carregando...'
  lang.ja.loading = 'ロード中...'
  lang.it.loading = 'Caricamento in corso...'
  lang.de.loading = 'Laden...'
  lang.ru.loading = 'Загрузка...'
  lang.zh.loading = '正在加载...'
  lang.fr.loading = `Chargement...`
  //#endregion

</script>
<div class="auth"
  class:locked
  class:hidden="{ !locked }">

  <div class="message">
    { message }
  </div>
  <div class="input-row" style="padding: 0 4px">
    <div class="input-field">
      <Input 
        placeholder={ _lang.authPlaceholder.toUpperCase() } 
        bind:value={ key }
        on:submit={ () => dispatch('submit', key) }
        width="100%"
        uppercase
        autoSelect
        truncate
        />
    </div>
    <div class="unlock"> 
      <Button icon="key" block flat on:click={ () => dispatch('submit', key) } />
    </div>
  </div>
  
    
  <div style="padding: 4px">
    <slot />
  </div>
</div>
{#if locked}
<div class="scrim"></div>
{/if}

<style>
* {
  transition: all 0.3s cubic-bezier(.2,.07,.62,1);
}
.auth {
  z-index: 10;
  position: fixed;
  top: 6px;
  left: 7px;
  background: var(--color-bg);
  width: calc(100% - 26px);
  height: 100vh;
  padding: 0 6px;
  border-radius: 4px;
  margin-top: 100vh;
  box-shadow: 0 1px 14px rgba(0, 0, 0, 0.8)  ; 
	-webkit-box-shadow: 0 1px 14px rgba(0, 0, 0, 0.8)  ; 
	-moz-box-shadow: 0 1px 14px rgba(0, 0, 0, 0.8)  ; 
}

.locked {
  margin-top: 0 !important;
}
.hidden {
  visibility: hidden;
  transition-delay: 2s;
}
.scrim {
    z-index: 9;
    position: fixed;
    top: 0;
    left: 0;
    background: #161616;
    width: 100vw;
    height: 100vh;
}
input {
    text-transform: uppercase !important;
}
.message {
    font-family: 'Fira Mono', monospace;
    /* width: 100%; */
    text-align: center;
    display: block;
    letter-spacing: .1em;
    line-height: 1.6em;
    padding: 0 8px;
    padding-top: 12px;
    font-size: 11px;
}
.input-row {
  display: flex;
  gap: 4px;
  margin: 8px auto;
}
.input-field {
  width: calc(100% - 32px);
}
:global(.input-field .input-value) {
  padding: 8px 4px;
}
:global(.input-field .input-container) {
  margin: 0 !important;
}
.unlock {
  /* display: flex;
  margin-right: 14px;
  width: 28px;
  height: 32px; */
}
.unlock .button {
  /* width: -webkit-fill-available;
  height: -webkit-fill-available; */
}



</style>