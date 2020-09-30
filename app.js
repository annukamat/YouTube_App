$(document).ready(function () {
	var key = "AIzaSyDCTZQsIrTs8WWzOipapoEi2bc_FY4-Rvo";
	var playlistId = "PL2fnLUTsNyq7A335zB_RpOzu7hEUcSJbB";
	var URL = "https://www.googleapis.com/youtube/v3/playlistItems";

	var options = {
		part: "snippet",
		key: key,
		maxResults: 20,
		playlistId: playlistId,
	};

	loadVids();
	function loadVids() {
		$.getJSON(URL, options, (data) => {
			var id = data.items[0].snippet.resourceId.videoId;
			mainVid(id);
			resultsLoop(data);
			console.log(data);
		});
	}

	//MAIN VIDEO
	function mainVid(id) {
		$("#video").html(`
		<iframe
		width="560"
		height="315"
		src="https://www.youtube.com/embed/${id}"
		frameborder="0"
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
		allowfullscreen
	></iframe>
		`);
	} //MAIN VIDEO FUNC ENDS

	function resultsLoop(data) {
		$.each(data.items, function (i, item) {
			var thumb = item.snippet.thumbnails.medium.url;
			var title = item.snippet.title;
			var desc = item.snippet.description.substring(0, 100);
			var vid = item.snippet.resourceId.videoId;

			$("main").append(`
			<article class="item" data-key="${vid}">
			<img src="${thumb}" alt="photo" class="thumb" />
			<div class="details">
				<h4>${title}</h4>
				<p>${desc}</p>
			</div>
			</article>
			`);
		});
	} //RESULTSLOOP FUNCTION ENDS

	//CLICK EVENT
	$("main").on("click", "article", function () {
		var id = $(this).attr("data-key");
		mainVid(id);
	});
});
