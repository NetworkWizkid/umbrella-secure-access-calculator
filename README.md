# Cisco Umbrella & Secure Access Seat Calculator

## 📌 Overview
The **Cisco Umbrella & Secure Access Seat Calculator** helps organizations accurately determine the number of seats required for Cisco Umbrella and Secure Access deployments. It accounts for **subscription tiers**, **DNS queries**, **Enterprise Agreements (EA)**, and **Secure Internet Gateway (SIG) usage** as well as **Secure Access Subscriptions**.

## 🚀 Features
✔ Calculate **Total Seats Required** for Cisco Umbrella and Cisco Secure Access  
✔ Adjust **seats required based on existing DNS queries per user**  
✔ **SIG Usage Calculation** based on **Peak Bandwidth** requirements
✔ Identify **under or over-utilization**  
✔ Works with **K-12 and Higher Education licensing models**
✔ Calculate **Secure Access Seats Required**
✔ Compare **Umbrella SIG Utilization vs. Secure Access Utilization**
✔ Save and download results as a **PDF file**

---

## 🛠 Usage Instructions

### **New Deployment Calculation**
1️⃣ Set **'Average DNS Queries Per Day, Per User'** to **5,000**  
2️⃣ Enter the **number of users** in the respective fields  
3️⃣ Specify if the subscription is part of an **Enterprise Agreement (EA)**  

### **Existing Deployment Analysis**
1️⃣ Enter the **number of existing users**  
2️⃣ Enter the **current DNS Queries Per Day, Per User**  
3️⃣ Select **EA status (Yes/No)**  
4️⃣ The **Utilization field** will indicate **over or underuse** based on a **5,000 DNS query allowance per user**  

### **SIG Usage Calculation**
1️⃣ Enter the **required number of seats**  
2️⃣ Enter the **estimated Peak Bandwidth Per Month, Per User**  
3️⃣ The **SIG Average Bandwidth per user** (kbps/day) will be displayed  
4️⃣ **SIG Utilization** is calculated automatically  
5️⃣ If **SIG usage exceeds 100%**, the **Additional SIG Users Required** field will populate  

### **Compare Secure Access against Umbrella**
1️⃣ Enter the relevant Umbrella SIG information including the number of existing seats or seats required
2️⃣ Select **Yes** for **Would you like to compare Secure Access with Umbrella or calculate Secure Access seats?**
3️⃣ Select a **single** DNS subscription or a **maximum** of one SIA and one SPA subscription
4️⃣ If SIA or SPA is selected, enter the **number of users** for each subscription  
5️⃣ Leave Secure Access Peak Bandwidth Per Month, Per User at a default of **20GB** unless users are expected to exceed this amount monthly
6️⃣ The **Secure Access Utilization** will be calculated based on the inputs provided

## **Calculate Secure Access DNS Defense Seats**
1️⃣ Enter the **number of users** for Secure Access DNS Defense in the Number of Employees field and optional K-12 or Higher Education fields
2️⃣ Enter the **Average DNS Queries Per Day, Per User** (default is **5000 DNS Queries Per Day, Per User**)
3️⃣ Select the option **Would you like to compare Secure Access with Umbrella or calculate Secure Access seats?** and select **Yes**
4️⃣ Select the **DNS Defense Essentials** or **DNS Defense Advantage** subscription tier
5️⃣ The **Total Seats Required** will be calculated based on the inputs provided

## **Calculate Secure Access Private Access or Secure Internet Access Seats**
1️⃣ Select the option **Would you like to compare Secure Access with Umbrella or calculate Secure Access seats?** and select **Yes**
2️⃣ Select the **Secure Access Subscription Tier** (either **Secure Internet Access Essentials or Advantage** or **Secure Private Access Essentials or Advantage**). If you want to calculate both SIA and SPA, select one of each.
3️⃣ Enter the **number of users** for each subscription tier
4️⃣ Enter the **Secure Access Peak Bandwidth Per Month, Per User** (default is **20GB**)
5️⃣ The **Total Seats Required** will be calculated based on the inputs provided

---

## ℹ️ Notes
⚠️ **You cannot populate both** the K-12 and Higher Education fields — choose only one!
⚠️ **As per Cisco's Umbrella DNS MSLA, each user is allowed** **5000 DNS Request Per Day**, totaling **150,000 queries per user, per month**   
⚠️ **As per Cisco's Umbrella SIG MSLA, each user is allowed** **50 kbps**, totaling **1,500 kbps per month**   
⚠️ **DNS Essentials and Advantage subscriptions count students differently:**
   - **K-12 students:** 1 user license **per 10 students**
   - **Higher Education students:** 1 user license **per 5 students**  

🔗 **Learn more about Cisco Umbrella licensing:**  
[How to Determine the Number of Cisco Umbrella Seats Required](https://networkwizkid.com/2024/03/07/how-to-determine-the-number-of-cisco-umbrella-seats-required/)

---

## 💡 Example Scenarios

### **Scenario 1: Enterprise with 3,000 Employees**
- **Subscription Tier:** `DNS Essentials`
- **Employees:** `3,000`
- **EA Subscription:** `No`
- **Anticipated DNS Queries Per User:** `3,400`
✅ **Total Seats Required:** `3,000`

### **Scenario 2: K-12 School with 150 Employees & 1,000 Students**
- **Subscription Tier:** `DNS Advantage`
- **Employees:** `150`
- **K-12 Students:** `1,000`
✅ **Total Seats Required:** `250 user licenses`  
✔ `(150 Employees + (1000 Students / 10)) = 250`

### **Scenario 3: Higher Education Facility with 565 Employees & 5,400 Students**
- **Subscription Tier:** `DNS Advantage`
- **Employees:** `565`
- **Higher Education Students:** `5,400`
✅ **Total Seats Required:** `1,645 user licenses`  
✔ `(565 Employees + (5400 Students / 5)) = 1,645`

## **Scenario 4: Secure Access Deployment with 6758 Users moving from an over utilized Umbrella Deployment**
- **Existing Umbrella Subscription Tier:** `SIG Essentials`
- **Existing Umbrella Seats:** `6758`
- **SIG Peak Bandwidth Per Month, Per User:** `2636.40kbps`
- **Secure Access Subscription Tier:** `Secure Internet Access Essentials` and `Secure Private Access Essentials`
✅ **SPA Users:** '3000'
✅ **SIA Users:** '3758'
- **Secure Access Peak Bandwidth Per Month, Per User:** `20GB`
✔ 'Rather than sticking with Umbrella where the SIG Utilization is 175.73% which would require an additional 5118 seats, the Secure Access Utilization is only 0.01% with the same amount of traffic and therefore, Secure Access is the better option.'

## **Scenario 5: Secure Access Deployment with 6758 Users where bandwidth exceeds 20GB per user, per month**
- Existing Secure Access Subscription Tier: `Secure Internet Access Essentials` and `Secure Private Access Essentials`
- Existing Secure Access Seats: `6758`
- Secure Access Peak Bandwidth Per Month, Per User: `30GB`
✔ Because the Secure Access Peak Bandwidth Per Month, Per User exceeds 20GB, the Secure Access Utilization will be calculated based on the inputs provided and the results will indicate if additional seats are required. In this example, an additional seat count of 3379 is required, taking the total Secure Access seats required to 10137.
---