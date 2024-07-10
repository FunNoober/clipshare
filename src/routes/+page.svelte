<script>
    import PocketBase from 'pocketbase';
    import {POCKETBASE_URL} from "$lib/config.js"
    import { onMount } from 'svelte';

    const pb = new PocketBase(POCKETBASE_URL);

    let clips = []
    onMount(async() => {
        await pb.collection('clips').getFullList({
            sort: '-created'
        }).then(records => clips = records);
    })
</script>

<svelte:head>
    <title>Clipshare</title>
</svelte:head>
<div class="grid">
    <div class="row">
        <h1>Home</h1>
        {#each clips as clip}
        <div class="card m-2" style="width: 21rem; padding: .5rem;">
            <video src="{POCKETBASE_URL}/api/files/clips/{clip.id}/{clip.video}" controls><track kind="captions"></video>
            <a class="card-title fw-bold link-underline-success link-offset-3" href="/clip/{clip.id}">{clip.title}</a>
            <small>{clip.created}</small>
        </div>
        {/each}
    </div>
</div>