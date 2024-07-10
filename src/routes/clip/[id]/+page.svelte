<script>
    import PocketBase from 'pocketbase';
    import {POCKETBASE_URL} from "$lib/config.js"
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    export let data;

    const pb = new PocketBase(POCKETBASE_URL);
    let videoId = data.id;

    let video = {};
    let uploaderName = {};
    let uploaderInformation = {}
    onMount(async() => {
        try{
            await pb.collection('clips').getFirstListItem(`id="${videoId}"`).then(response => video = response);
            await pb.collection('users').getFirstListItem(`id="${video.user}"`).then(response => uploaderInformation = response);
            uploaderName = uploaderInformation.username
        }catch{
            alert("Error");
        }
    })

    let viewerId;
    if(pb.authStore.isValid){
        viewerId = pb.authStore.model.id;
    }

    let deleteButton;
    let deleteButtonTwo;
    async function deleteVideoStageOne(){
        deleteButton.style.display = "none";
        deleteButtonTwo.style.display = "block";
    }

    async function deleteVideoStageTwo(){
        try{
            await pb.collection('clips').delete(video.id);
            goto('/')
        }catch{
            alert("Error while deleting");
        }
    }
</script>

<svelte:head>
    <title>{video.title} | Clipshare</title>
</svelte:head>
<div class="d-flex container justify-content-center h-100 flex-column">
    <video src="{POCKETBASE_URL}/api/files/clips/{video.id}/{video.video}" controls><track kind="captions"></video>
    <div class="d-flex row">
        <h1>{video.title}</h1>
        <div class="d-flex flex-row justify-content-between">
            <small>{video.created}</small>
            <div class="div">
                <a class="card-title fw-bold link-underline-success link-offset-3" href="/users/{video.user}" style="font-size: 1rem;">
                    {uploaderName}
                </a>
                {#if uploaderInformation.verifiedUser == true}
                    <span class="badge text-bg-success">Verified</span>
                {/if}
            </div>
        </div>
        <div class="card m-2 p-2">
            <label for="videoDescription">Description:</label>
            <p id="videoDescription">{video.description}</p>
            {#if viewerId == video.user}
                <button bind:this={deleteButton} class="btn btn-warning w-5 align-self-end" on:click={deleteVideoStageOne}>Delete</button>
                <button bind:this={deleteButtonTwo} class="btn btn-danger w-5 align-self-end" style="display: none;" on:click={deleteVideoStageTwo}>Confirm?</button>
            {/if}
        </div>
    </div>
</div>