<script>
    import PocketBase from 'pocketbase';
    import {POCKETBASE_URL} from "$lib/config.js"
    import {goto} from '$app/navigation'

    const pb = new PocketBase(POCKETBASE_URL);
    let videoTitle = ""
    let videoDescription = ""
    let authToken = "NMV3JSPY0kUVj96RGCVW7hXfD0h9TJjL"
    let fileInput
    let errorUploading = false
    let hasStartedUpload = false

    async function uploadFile(){
        errorUploading = false
        hasStartedUpload = true
        try{
            let formData = new FormData()
            for(let file of fileInput.files){
                formData.append('video', file)
            }
            formData.append('title', videoTitle)
            formData.append('uploadToken', authToken)
            console.log(pb.authStore.model)
            formData.append('user', pb.authStore.model.id)
            formData.append('description', videoDescription)
            await pb.collection('clips').create(formData).then(response => goto(`/clip/${response.id}`))
        }
        catch(err){
            errorUploading = true
            hasStartedUpload = false
        }
    }
</script>

<svelte:head>
    <title>Upload | Clipshare</title>
</svelte:head>

<div class="d-flex container justify-content-center h-100 flex-column align-items-center py-4">
    {#if pb.authStore.isValid == false}
        <h1>You are not currently signed in</h1>
    {/if}
    {#if pb.authStore.isValid}
        <form action="/upload" class="d-flex flex-column grid gap-3 m-5">
            <input bind:this={fileInput} type="file" name="filename" id="fileUpload" class="form-control ">
            <input bind:value={videoTitle} type="text" name="title" id="titleUpload" placeholder="Epic Title" class="form-control" minlength="3">
            <input bind:value={videoDescription} type="text" name="description" id="description" placeholder="Video Description" class="form-control" rows="4">
            <!-- <input bind:value={authToken} type="text" name="authtoken" id="authToken" placeholder="Authentication Token" class="form-control" minlength="16"> -->
            <div class="d-flex flex-row">
                <input on:click={uploadFile} type="submit" value="Upload" class="form-control">
                {#if hasStartedUpload}
                    <div class="spinner-border m-2">

                    </div>
                {/if}
            </div>
            {#if errorUploading}
                <p class="p-3 text-light-emphasis bg-danger-subtle border border-danger-subtle rounded-3 fw-bold">There was an error while uploading. Your file may be over 350 MB</p>
            {/if}
        </form>
    {/if}
</div>