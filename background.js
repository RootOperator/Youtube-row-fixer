let video_row = document.getElementsByClassName('ytd-two-column-browse-results-renderer');


function set_videos_on_row(rows){
    for(var i =0; i < video_row.length; i++){
        if(video_row[i].style.cssText.includes('--ytd-rich-grid-items-per-row')){
            let val = `--ytd-rich-grid-items-per-row: ${rows};--ytd-rich-grid-posts-per-row: 4; --ytd-rich-grid-movies-per-row: 9;`;
            video_row[i].style.cssText = val;
        };
    }
}

browser.storage.local.get().then(data => {
    console.log(data);
    if(data.value){
        set_videos_on_row(data.value);
    }
});;

browser.runtime.onMessage.addListener(request => {
    set_videos_on_row(request.value);
});