describe('web', () => {
  function loadPage(path = '', mobile = false) {
    cy.visit(`http://localhost:3000/${path}`)
    cy.wait(1000)
  }
  describe('top', { testIsolation: false }, () => {
    it('[ja] main visual', () => {
      loadPage()
      cy.contains('h2', '最新情報は公式SNSでご紹介しています')
      cy.contains('@vuefes')
    })
    it('[en] main visual', () => {
      loadPage('en')
      cy.contains('h2', 'Get the latest information on our official social media')
      cy.contains('@vuefes')
    })
  })
  describe('message', { testIsolation: false }, () => {
    it('[ja] message', () => {
      loadPage()
      cy.contains('h2', 'メッセージ')
        .closest('section')
        .within(() => {
          cy.contains('日本最大級の Vue.js カンファレンス、Vue Fes Japan を 2024 年も開催します！')
        })
    })
    it('[en] message', () => {
      loadPage('en')
      cy.contains('h2', 'Message')
        .closest('section')
        .within(() => {
          cy.contains('Vue Fes Japan, the largest Vue.js conference in Japan, will be held again in 2024!')
        })
    })
  })
  describe('footer', () => {
    it('[ja] footer', () => {
      loadPage()
      cy.get('#footer').within(() => {
        cy.contains('a', 'Vue Fes Japan Online 2022').should('have.attr', 'href', 'https://vuefes.jp/2022/')
        cy.contains('a', 'Vue Fes Japan 2020').should('have.attr', 'href', 'https://vuefes.jp/2020/')
        cy.contains('a', 'Vue Fes Japan 2019').should('have.attr', 'href', 'https://vuefes.jp/2019/')
        cy.contains('a', 'Vue Fes Japan 2018').should('have.attr', 'href', 'https://vuefes.jp/2018/')
        cy.contains('a', 'プライバシーポリシー').should('have.attr', 'href', '/privacy')
        cy.contains('a', '行動規範').should('have.attr', 'href', '/code-of-conduct')
        cy.contains('© 2018-2024 Vue.js Japan Users Group some rights reserved.')
        cy.contains(
          'Vue.js artworks by Evan You is licensed under a Creative Commons Attribution 4.0 International License.',
        )
      })
    })
    it('[en] footer', () => {
      loadPage('en')
      cy.get('#footer').within(() => {
        cy.contains('a', 'Vue Fes Japan Online 2022').should('have.attr', 'href', 'https://vuefes.jp/2022/')
        cy.contains('a', 'Vue Fes Japan 2020').should('have.attr', 'href', 'https://vuefes.jp/2020/')
        cy.contains('a', 'Vue Fes Japan 2019').should('have.attr', 'href', 'https://vuefes.jp/2019/')
        cy.contains('a', 'Vue Fes Japan 2018').should('have.attr', 'href', 'https://vuefes.jp/2018/')
        cy.contains('a', 'Privacy Policy').should('have.attr', 'href', '/en/privacy')
        cy.contains('a', 'Code of Conduct').should('have.attr', 'href', '/en/code-of-conduct')
        cy.contains('© 2018-2024 Vue.js Japan Users Group some rights reserved.')
        cy.contains(
          'Vue.js artworks by Evan You is licensed under a Creative Commons Attribution 4.0 International License.',
        )
      })
    })
  })
  describe('privacy', { testIsolation: false }, () => {
    it('[ja] privacy content', () => {
      loadPage('privacy')
      cy.contains('h1', 'プライバシーポリシー')
    })
    it('[en] privacy content', () => {
      loadPage('en/privacy')
      cy.contains('h1', 'Privacy Policy')
    })
  })
  describe('code-of-conduct', { testIsolation: false }, () => {
    it('[ja] code-of-conduct content', () => {
      loadPage('code-of-conduct')
      cy.contains('h1', '行動規範')
    })
    it('[en] code-of-conduct content', () => {
      loadPage('en/code-of-conduct')
      cy.contains('h1', 'Code of Conduct')
    })
  })
})