from locust import HttpUser, task, between

class CharityUser(HttpUser):
    wait_time = between(1, 2)

    @task(3)
    def get_donations(self):
        self.client.get("/api/donations")  

    @task(2)
    def get_home(self):
        self.client.get("/") 

    @task(1)
    def get_users(self):
        self.client.get("/api/users")  
