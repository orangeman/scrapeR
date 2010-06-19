package scrape.it;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URL;
import java.net.URLDecoder;

import org.apache.http.HttpEntity;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.BasicResponseHandler;
import org.apache.http.impl.client.DefaultHttpClient;

import android.app.Activity;
import android.app.ProgressDialog;
import android.graphics.Picture;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.WebView.PictureListener;
import android.widget.Toast;

public class ScrapeIt extends Activity {
    private WebView wv;
	protected String name;

	/** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
        
        
        ScrapeView beolingus = new ScrapeView(this, null);
        
        beolingus.loadUrl("http://dict.tu-chemnitz.de/dings.cgi?" +
        		"lang=en&mini=1&count=50&query=hallo&service=deen");
        
        beolingus.scrape(".s2", new Object() {
            public void onScrape(String translation) {
                updateUI(translation);
            }
        });
        
        wv = (WebView) findViewById(R.id.sv);
        wv.loadUrl("file:///android_asset/hello.html");
        
        wv.setPictureListener(new PictureListener() {

			@Override
			public void onNewPicture(WebView view, Picture p) {
				Log.d("S C R A P E","ON PICTURE"+ p);
//				wv.zoomIn();
//				wv.zoomIn();
//				wv.zoomIn();
//				wv.scrollTo(0, 191);
				
				wv.setPictureListener(null);
			}});
        
        wv.setWebViewClient(new WebViewClient() {

			@Override
			public boolean shouldOverrideUrlLoading(WebView view, String url) {
				
				Log.d("S C R A P E", url);
				if (!url.contains("?speak=")) return false;
				name = url.split("text=")[1];
				name = URLDecoder.decode(name);
				url = url.split(";")[0];
				url = url.split("\\?")[1];
				url="http://dict.tu-chemnitz.de/"+url.replace("=", "-")+".mp3";
				Log.d("S C R A P E", url);
				
				new GrabURL().execute(url);
				
				return true;
			}

			@Override
			public void onPageFinished(WebView view, String url) {
				Log.d("S C R A P E","FINISHED LOADING"+ url);
				super.onPageFinished(view, url);
			}});
        
    }
    
   protected void updateUI(String translation) {
        // TODO Auto-generated method stub
        
    }

private class GrabURL extends AsyncTask<String, Void, Void> {  
    	private final HttpClient Client = new DefaultHttpClient();  
    	private String Error = null;  
    	private ProgressDialog prog = new ProgressDialog(ScrapeIt.this);  
    	
    	protected void onPreExecute() {  
    	prog.setMessage("Downloading MP3..");  
    	prog.show();
    	}  
    
    	protected Void doInBackground(String... urls) {  
    		try {  
    			HttpGet httpget = new HttpGet(urls[0]);  
    			ResponseHandler<String> responseHandler = new BasicResponseHandler();  
    			HttpEntity he = Client.execute(httpget).getEntity();
    			
    	    	String state = android.os.Environment.getExternalStorageState();
    		    if(!state.equals(android.os.Environment.MEDIA_MOUNTED))  {
    		        Log.d("Sound", "sdCard not mounted :(");
    		    }

    		    // make sure the directory we plan to store the recording in exists
    		    File directory = new File("/sdcard/sound/test.mp3").getParentFile();
    		    if (!directory.exists() && !directory.mkdirs()) {
    		      Log.d("Sound", "Ohhhh :(");
    		    }
    		    
    			FileOutputStream os = new FileOutputStream("/sdcard/sound/"+name+".mp3");
    			he.writeTo(os);
    			os.flush();
    			os.close();
    		} catch (ClientProtocolException e) {  
    			Error = e.getMessage();  
    			cancel(true);  
    		} catch (IOException e) {  
    			Error = e.getMessage();  
    			cancel(true);  
    		} 
    		return null;  
    	}  

    	protected void onPostExecute(Void unused) {  
    		prog.dismiss();  
    		if (Error != null) {  
    			Toast.makeText(ScrapeIt.this, Error, Toast.LENGTH_LONG).show();  
    		} else {  
    			Toast.makeText(ScrapeIt.this, "fertig.", Toast.LENGTH_LONG).show();  
    		}  
    	}  

   }  


}