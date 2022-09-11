import { DocumentUtil } from "../../data/protocols/document-util";

export class JsDocumentUtil implements DocumentUtil {
    removeNonDigitis(document: string): string {
        return document.replace(/\D/g,'')
    }
}