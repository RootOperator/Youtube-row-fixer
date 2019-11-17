function calculate_windoes_on_row(row_witdh, total_videos) {
    let screen_width = screen.width - 305;
    let video_width = screen_width / total_videos;
    return Math.round(row_witdh / video_width);
}

function set_videos_on_row(total_videos){
    let video_rows = document.getElementsByClassName('ytd-two-column-browse-results-renderer');
    for(var i = 0; i < video_rows.length; i++){
        if(video_rows[i].style.cssText.includes('--ytd-rich-grid-items-per-row')){
            let row = calculate_windoes_on_row(video_rows[i].clientWidth, total_videos);
            let val = `--ytd-rich-grid-items-per-row: ${row};--ytd-rich-grid-posts-per-row: 4; --ytd-rich-grid-movies-per-row: 9;`;
            video_rows[i].style.cssText = val;
        };
    }
}

function row_value() {
    browser.storage.local.get().then(data => {
        if(data.value){
            set_videos_on_row(data.value);
        }
    });;
}

row_value();

browser.runtime.onMessage.addListener(request => {
    set_videos_on_row(request.value);
});

window.onresize = row_value;