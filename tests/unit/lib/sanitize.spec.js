let sanitizeHtml = require('sanitize-html')

describe('sanitize', function() {
    it('默认', () => {
        let html = '<strong>hello world</strong>'
        expect(sanitizeHtml(html)).toBe(html)
        // 不允许图片
        expect(sanitizeHtml("<img src='/files/201910/01.jpg' />")).toBe('')
        // 不允许script
        expect(sanitizeHtml("<script>alert('hello world')</script>")).toBe('')
        // 允许console
        expect(sanitizeHtml("console.log('hello world')")).toBe("console.log('hello world')")
    })
    it('允许图片', () => {
        let allowedTags = sanitizeHtml.defaults.allowedTags.concat(['img'])
        let html = '<img src="/files/201910/01.jpg" />'
        expect(sanitizeHtml(html, { allowedTags })).toBe(html)

        let html2 = '<img src=x onerror=alert("img") />'
        expect(sanitizeHtml(html2, { allowedTags })).toBe('<img src="x" />')
    })
})
