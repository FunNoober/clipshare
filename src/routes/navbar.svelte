<script>
    import PocketBase from 'pocketbase';
    import {POCKETBASE_URL} from "$lib/config.js"
    import {signedIn} from "$lib/globalstate.js"
    import { get } from 'svelte/store';

    const pb = new PocketBase(POCKETBASE_URL);
    
    let authData = {}
    signedIn.set(pb.authStore.isValid)
    let locallySignedIn = get(signedIn)

    signedIn.subscribe(($signedIn) => {
        locallySignedIn = get(signedIn)
        authData = pb.authStore.model
    })
    if(pb.authStore.model != null){
        authData = pb.authStore.model
    }
</script>

<nav class="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
    <div class="container container-fluid">
        <a class="navbar-brand" href="/">Clipshare</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="/">Home</a>
                </li>
                <div class="nav-item">
                    <a href="/upload" class="nav-link active">Upload</a>
                </div>
                <div class="nav-item">
                    <a href="/about" class="nav-link active">About</a>
                </div>
                {#if locallySignedIn == false}
                    <div class="nav-item">
                        <a href="/signup" class="nav-link active">Sign Up</a>
                    </div>
                    <div class="nav-item">
                        <a href="/signin" class="nav-link active">Sign In</a>
                    </div>
                {/if}
                {#if locallySignedIn}
                    <div class="nav-item">
                        <a href="/users/{authData.id}" class="nav-link active">{authData.username}</a>
                    </div>
                {/if}
            </ul>
        </div>
    </div>
</nav>