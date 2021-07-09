import { currentMix, currentTitle, currentTrack, key } from '$stores/stores'
import * as utils from '$lib/utils'

export async function trendingHandler(item) {
    console.log(item)
    let endpoint = 'next'
    let videoId = item.videoId
    let playlistId = item.playlistId
    let ctoken = ''
    let radio = await utils
        .getNext(0, '', videoId, playlistId, ctoken ? ctoken : '')
        .catch((err) => console.log(`error:` + err))
    console.log(radio, `radio`)
    await utils.getSrc(videoId)
    // currentArtist.set(artist)
    currentMix.set({
        videoId: `${videoId}`,
        playlistId: `${playlistId}`,
        continuation: radio.continuation,
        list: [
            ...radio.results.map((d, i) => ({
                continuation: radio.continuation,
                itct: d.itct,
                autoMixList: d.autoMixList,
                artistId: d.artistInfo.browseId,
                index: d.index,
                videoId: d.videoId,
                title: d.title,
                artist: d.artistInfo.artist,
                thumbnail: d.thumbnail,
                length: d.length
            }))
        ]
    })
    currentTitle.set(radio.results[0].title)
    // currentMix.set({
    // 	videoId: `${data.musicResponsiveListItemRenderer.flexColumns[0].musicResponsiveListItemFlexColumnRenderer.text.runs[0].navigationEndpoint.watchEndpoint.videoId}`,
    // 	playlistId: `${data.musicResponsiveListItemRenderer.flexColumns[0].musicResponsiveListItemFlexColumnRenderer.text.runs[0].navigationEndpoint.watchEndpoint.playlistId}`,
    // 	list: [...radio]
    // })
    currentTrack.set({ ...radio[0] })
    console.log('current: ' + JSON.stringify(currentTrack))
    // console.log(autoMixList, $autoMixList, $list, $index)
    key.set(0)

    // console.log(src)
}
