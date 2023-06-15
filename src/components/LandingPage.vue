<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { useUserStore } from '../stores/users';
import { ref, onMounted, computed } from 'vue';


const userStore = useUserStore();
const router = useRouter();
const isSignIn = ref(true);
const username = ref('');
const password = ref('');
const newUsername = ref('');
const newPassword = ref('');

onMounted(() => {
	if (localStorage.getItem('users')) {
		userStore.users = JSON.parse(localStorage.getItem('users'));
	} else {
		localStorage.setItem('users', JSON.stringify(userStore.users));
	}
})

function createAccount(newUser, newPass) {
	if (newUser == '' || newPass == '') {
		return alert('Fill in the fields!')
	} else if (userStore.users.find(user => user.username === newUser)) {
		return alert('Username already exists!')
	} else {
		userStore.addUser(newUser, newPass)
		localStorage.setItem('users', JSON.stringify(userStore.users));
		isSignIn.value = true;
		newUsername.value = '';
		newPassword.value = '';
		return alert('Account Successfully Created')
	}
}

function login(username, password) {
	const userExists = userStore.users.find(user => user.username === username && user.password === password);
	if (userExists) {
		alert('Login Successful')
		router.push('/dashboard')
		userStore.currentUsername = username;
	} else {
		alert('Invalid username or password');
	}
}
</script>
  
<template>
	<div class="landing_page">
		<!-- Separated the forms by condition instead of re-using a component for easier modifications -->
		<!-- Login -->
		<template v-if="isSignIn">
			<div class="form_container padding">
				<div>
					<h1 class="heading">Welcome Back!</h1>
				</div>
				<div>
					<div class="input_container">
						<div class="title">Username</div>
						<input type="text" placeholder="Enter your name" v-model="username" required>
					</div>
					<div class="input_container">
						<div class="title">Password</div>
						<input type="password" placeholder="Enter your password" v-model="password" required>
					</div>
					<button class="submit_btn" @click="login(username, password)">Login</button>

					<div class="center">
						Don't have an account yet? <a @click="isSignIn = !isSignIn" class="link">Sign Up</a>
					</div>
				</div>
			</div>
		</template>

		<!-- Sign Up -->
		<template v-else>
			<div class="form_container padding">
				<div>
					<h1 class="heading">Create your account</h1>
				</div>
				<div>
					<div class="input_container">
						<div class="title">Username</div>
						<input type="text" placeholder="Enter your name" v-model="newUsername" required>
					</div>
					<div class="input_container">
						<div class="title">Password</div>
						<input type="password" placeholder="Enter your password" v-model="newPassword" required>
					</div>
					<button class="submit_btn" @click="createAccount(newUsername, newPassword)">Create
						Account</button>
					<div class="center">
						Already have an account? <a @click="isSignIn = !isSignIn" class="link">Sign In
						</a>
					</div>
				</div>
			</div>
		</template>

		<div class="side_panel_container padding">
			<img src="../assets/images/desktop.png" class="image" alt="">
			<div class="side_title">
				Track your work today!
			</div>

			<div class="side_sub_title">
				Effectively track your work with Time Trakker!
			</div>
		</div>
	</div>
</template>
  
<style scoped>
.landing_page {
	font-family: 'Open Sans', sans-serif;
	display: flex;
	user-select: none;
	width: 100vw;
	justify-content: center;
}

.form_container {
	margin: 0px 2vw;
	width: 25vw;
}

.side_panel_container {
	margin: 0px 2vw;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
}

.input_container {
	display: block;
	margin: 10px 0px;
}

.title {
	font-weight: 600;
}

.link {
	color: #517C3B;
	cursor: pointer;
	margin-left: 10px;
}

input[type=text],
input[type=password] {
	padding: 12px 20px;
	font-family: 'Open Sans', sans-serif;
	width: 100%;
	margin: 8px 0;
	display: inline-block;
	border: 1px solid #ccc;
	border-radius: 25px;
	background-color: transparent;
	box-sizing: border-box;
}

.submit_btn {
	padding: 10px;
	background-color: #517C3B;
	border: none;
	color: white;
	border-radius: 25px;
	width: 100%;
	font-family: 'Open Sans', sans-serif;
	margin: 10px 0px;
	cursor: pointer;
}

.heading {
	font-weight: 600;
}

.image {
	width: 100%;
	max-width: 150px;
}

.side_title {
	font-weight: 600;
	font-size: 2rem;
}

.side_sub_title {
	font-weight: 300;
	font-size: 1rem;
}


@media (max-width: 1024px) {

	.landing_page {
		flex-direction: column;
	}

	.form_container,
	.side_panel_container {
		width: 100%;
		max-width: 500px;
		margin: auto;
	}

	.heading {
		font-size: 25px;
		text-align: center;
	}

	.link {
		margin-left: 0px;
	}

	.center {
		text-align: center;
	}

	.side_title,
	.side_sub_title {
		text-align: center;
	}

	.side_title {
		font-size: 25px;
	}

}
</style>
  