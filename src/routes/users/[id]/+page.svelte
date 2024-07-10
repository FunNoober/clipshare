<script>
    import PocketBase from 'pocketbase';
    import {POCKETBASE_URL} from "$lib/config.js"
    import { onMount } from 'svelte';
    export let data;

    const pb = new PocketBase(POCKETBASE_URL);

    let userId = data.id;
    let userData = {}
    let videos = []

    onMount(async() => {
        try{
            await pb.collection('users').getOne(userId).then(response => userData = response)
            await pb.collection('clips').getFullList({
                sort: '-created',
                filter: `user = "${userId}"`
            }).then(response => videos = response)
        }catch{
            alert("Error")
        }
    })
</script>

<svelte:head>
    <title>{userData.username} | Clipshare</title>
</svelte:head>
<div class="d-flex container justify-content-center h-100 flex-column">
    <h1>{userData.username}</h1>
    <div class="grid">
        <div class="row">
            {#each videos as clip}
                <div class="card m-2" style="width: 21rem; padding: .5rem;">
                    <video src="{POCKETBASE_URL}/api/files/clips/{clip.id}/{clip.video}" controls><track kind="captions"></video>
                    <a class="card-title fw-bold link-underline-success link-offset-3" href="/clip/{clip.id}">{clip.title}</a>
                    <small>{clip.created}</small>
                </div>
            {/each}
        </div>
    </div>
</div>