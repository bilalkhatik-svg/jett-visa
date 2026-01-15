// oauthHelper.ts
import CryptoJS from 'crypto-js';
import OAuth from 'oauth-1.0a';
import { BaseURL, APIversion } from "@/utils/config";

interface Token {
    key: string;
    secret: string;
}

interface RequestData {
    url: string;
    method: string;
    data?: Record<string, unknown>;
}
export interface AuthOdetails {
    AccessToken: string;
    ConsumerKey: string;
    ConsumerSecret: string;

}


export function getAuthHeader(endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET', authOdetails: AuthOdetails,) {
    
    if (!authOdetails?.ConsumerKey || !authOdetails?.ConsumerSecret || !authOdetails?.AccessToken) {
        return { Authorization: '' };
    }

    const oauth = new OAuth({
        consumer: {
            key: authOdetails.ConsumerKey,
            secret: authOdetails.ConsumerSecret,
        },
        signature_method: 'HMAC-SHA1',
        hash_function(baseString: string, key: string): string {
            return CryptoJS.HmacSHA1(baseString, key).toString(CryptoJS.enc.Base64);
        },
    });

    const token: Token = {
        key: authOdetails.AccessToken,
        secret: ""
    };

    const requestData: RequestData = {
        url: `${BaseURL}${APIversion}${endpoint}`,
        method,
        data: {}, // optional, can add body data here
    };
    
    
    const oauthData = oauth.authorize(requestData, token);
    const header = oauth.toHeader(oauthData);
    
    return header;
}
