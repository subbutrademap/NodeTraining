// Cookie Utility for token management
class CookieUtility {
    // Set token in cookie
    static setToken(token, days = 7) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `authToken=${token};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
    }

    // Get token from cookie
    static getToken() {
        const name = 'authToken=';
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookieArray = decodedCookie.split(';');
        
        for (let i = 0; i < cookieArray.length; i++) {
            let cookie = cookieArray[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(name) === 0) {
                return cookie.substring(name.length, cookie.length);
            }
        }
        return null;
    }

    // Remove token from cookie
    static removeToken() {
        document.cookie = 'authToken=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
    }

    // Check if token exists
    static hasToken() {
        return this.getToken() !== null;
    }
}

export default CookieUtility;
