export const PuppeteerConstants = {
  CDP: {
    METHODS: {
      NETWORK: {
        ENABLE: 'Network.enable',
      },
      PAGE: {
        ENABLE: 'Page.enable',
      },
    },
    EVENTS: {
      NETWORK: {
        WEBSOCKET_FRAME_RECEIVED: 'Network.webSocketFrameReceived',
      },
    },
  },
} as const
