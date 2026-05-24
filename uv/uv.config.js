self.__uv$config = {
    prefix: '/uv/service/',
    bare: 'https://browser.celestrium-online.workers.dev/', 
    encodeUrl: Ultraviolet.codec.xor.encode,
    decodeUrl: Ultraviolet.codec.xor.decode,
    handler: '/uv/uv.handler.js',
    bundle: '/uv/uv.bundle.js',
    config: '/uv/uv.config.js',
    sw: '/uv/sw.js',
    wss: true // CRITICAL FEATURE: Unlocks raw websocket processing channels
};