<script>
    import PocketBase from 'pocketbase';
    import {POCKETBASE_URL} from "$lib/config.js"
    import {goto} from '$app/navigation'
    import {signedIn} from "$lib/globalstate.js"
    import { onMount } from 'svelte';

    let pb = new PocketBase(POCKETBASE_URL);

    let username = ''
    let emailAddress = ''
    let password = ''

    async function createAccount(){
        try{
            await pb.collection('users').create({
                username: username,
                email: emailAddress,
                password: password,
                passwordConfirm: password
            })
            await signInAfterAccountCreation()
        }catch{
            alert("Failed to create account")
        }
    }
    async function signInAfterAccountCreation(){
        try{
            await pb.collection('users').authWithPassword(emailAddress, password);
            signedIn.set(pb.authStore.isValid)
            goto("/")
        }catch(err){
            console.log(err)
            alert("Failed to sign in")
        }
    }
</script>

<svelte:head>
    <title>Sign Up | Clipshare</title>
</svelte:head>
<div class="d-flex container justify-content-center h-100 flex-column align-items-center py-4">
    <form action="/signup" class="form-signin d-flex flex-column grid gap-3 m-auto">
        <label for="username">Username</label>
        <input bind:value={username} type="text" class="form-control" id="username" placeholder="My epic username">
        <label for="email">Email Address</label>
        <input bind:value={emailAddress} type="email" name="email" id="email" class="form-control" placeholder="example@email.com">
        <label for="password">Password</label>
        <input bind:value={password} type="password" name="password" id="password" class="form-control">
        <input on:click={createAccount} type="submit" value="Sign Up" class="form-control btn btn-success">
    </form>
</div>