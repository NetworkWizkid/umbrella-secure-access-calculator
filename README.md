# Cisco Umbrella Seat Calculator

## 📌 Overview
The **Cisco Umbrella Seat Calculator** helps organizations accurately determine the number of seats required for Cisco Umbrella deployments. It accounts for **subscription tiers**, **DNS queries**, **Enterprise Agreements (EA)**, and **Secure Internet Gateway (SIG) usage**.

## 🚀 Features
✔ Calculate **Total Seats Required**  
✔ Adjust **seats based on actual DNS queries per user**  
✔ **SIG Usage Calculation** including **Peak Bandwidth**  
✔ Identify **under or over-utilization**  
✔ Works with **K-12 and Higher Education licensing models**  

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

---

## ℹ️ Notes
⚠️ **Do not populate both** the K-12 and Higher Education fields—choose only one!  
⚠️ **Each user is allowed** **50 kbps per second**, totaling **1,500 kbps per month** under the **Cisco Umbrella MSLA**  
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

---