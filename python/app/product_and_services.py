from selenium import webdriver
from selenium.webdriver.chrome.options import Options

options = Options()
# Change the path to your actual Chrome user data folder
options.add_argument(r"--user-data-dir=C:\Users\tommy\AppData\Local\Google\Chrome\User Data")
options.add_argument(r"--profile-directory=Default")  # or another profile

driver = webdriver.Chrome(options=options)
driver.get("https://renewsostainability.github.io/")

data = driver.execute_script(
    "return localStorage.getItem('admin_beas_services');"
)
print(data)

driver.quit()