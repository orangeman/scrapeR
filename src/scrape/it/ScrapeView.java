package scrape.it;

import android.content.Context;
import android.util.AttributeSet;
import android.util.Log;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class ScrapeView extends WebView {

    public ScrapeView(Context c, AttributeSet a) {
        super(c, a);
    }

    public void scrape(final String cssSelector, Object callBack) {

        addJavascriptInterface(callBack, "scrapeview");

        setWebViewClient(new WebViewClient() {

            @Override
            public void onPageFinished(WebView view, String url) {

                view.loadUrl("javascript: " +
                        "scrapeview.onScrape(" +
                        "document.querySelector('"+cssSelector+"'));"
                );
            }

        });
    }





    public void crop(String cssSelector) {
        loadUrl("javascript:" +
                "var ex = document.querySelectorAll('"+cssSelector+"');" +
                "var cell = document.body;" +
                "while ( cell.childNodes.length >= 1 ) {" +
                "cell.removeChild( cell.firstChild );" +
                "}" +
                "for (var i=0; i < ex.length; i++) {" +
                "document.body.appendChild(ex[i]);" +
        "}");
    }

}
