// Add event listeners for subscription, add_students, and all inputs/selects
document.getElementById("subscription").addEventListener("change", updateSubscription);
document.getElementById("add_students").addEventListener("change", toggleStudentFields);
document.querySelectorAll("input, select").forEach(el => el.addEventListener("input", updateSeats));

function toggleStudentFields() {
    let addStudents = document.getElementById("add_students").value;
    let studentFields = document.getElementById("student_fields");
    let k12Field = document.getElementById("k12_students");
    let higherEdField = document.getElementById("higher_ed_students");

    // Show/hide student fields based on "Add Students?" and subscription tier
    if (addStudents === "No" || document.getElementById("subscription").value === "dns_edu") {
        studentFields.style.display = "none";
        k12Field.value = "";
        higherEdField.value = "";
    } else {
        studentFields.style.display = "block";
    }
}

function updateSubscription() {
    let subscription = document.getElementById("subscription").value;
    let studentFields = document.getElementById("student_fields");
    let k12Field = document.getElementById("k12_students");
    let higherEdField = document.getElementById("higher_ed_students");
    let sigPeakField = document.getElementById("sig_peak_bandwidth");
    let addStudents = document.getElementById("add_students").value;

    // Ensure users select a valid subscription tier before proceeding
    if (subscription === "select") {
        document.getElementById("output").style.display = "none"; // Hide output until a valid tier is chosen
        return;
    }

    // Reset all input values when Subscription Tier changes
    document.querySelectorAll("input").forEach(el => el.value = "");
    document.getElementById("dns_queries").value = "5000"; // Default DNS Queries Per User
    document.getElementById("add_students").value = "No"; // Reset Add Students to No

    // Hide student fields for DNS for EDU or when Add Students is No
    studentFields.style.display = (subscription === "dns_edu" || addStudents === "No") ? "none" : "block";

    // Clear student fields when hidden
    if (subscription === "dns_edu" || addStudents === "No") {
        k12Field.value = "";
        higherEdField.value = "";
    }

    // Enable SIG Peak Bandwidth input only if the subscription tier contains "sig"
    sigPeakField.disabled = !subscription.includes("sig");

    // Disable "Average DNS Queries Per Day, Per User" for SIG subscription tiers
    document.getElementById("dns_queries").disabled = subscription.includes("sig");

    // Reset output
    document.getElementById("output").innerHTML = "";
    document.getElementById("output").style.display = "none"; // Hide output until a valid tier is chosen
}

function calculateSeats() {
    let subscription = document.getElementById("subscription").value;

    // Prevent calculation if no valid tier is selected
    if (subscription === "select") {
        alert("Please select a valid subscription tier and enter the relevant values before calculating.");
        return;
    }

    updateSeats();
    document.getElementById("output").style.display = "block"; // Show results after first calculation
}

function updateSeats() {
    let subscription = document.getElementById("subscription").value;

    // Prevent calculation until a valid subscription tier is selected
    if (subscription === "select") {
        document.getElementById("output").innerHTML = "<b>Please select a valid subscription tier.</b>";
        document.getElementById("output").style.display = "none";
        return;
    }

    let employees = Number(document.getElementById("employees").value) || 0;
    let k12 = Number(document.getElementById("k12_students").value) || 0;
    let higherEd = Number(document.getElementById("higher_ed_students").value) || 0;
    let dnsQueries = Number(document.getElementById("dns_queries").value) || 5000;
    let sigPeakBandwidth = Number(document.getElementById("sig_peak_bandwidth").value) || 1500;
    let ea = document.getElementById("ea").value;

    // Automatically disable the other student category field when one is populated
    if (k12 > 0) {
        document.getElementById("higher_ed_students").disabled = true;
    } else if (document.getElementById("add_students").value === "Yes" && subscription !== "dns_edu") {
        document.getElementById("higher_ed_students").disabled = false;
    }

    if (higherEd > 0) {
        document.getElementById("k12_students").disabled = true;
    } else if (document.getElementById("add_students").value === "Yes" && subscription !== "dns_edu") {
        document.getElementById("k12_students").disabled = false;
    }

    // Calculate total seats required
    let baseUsers = employees + k12 + higherEd;
    let additionalSeats = Math.ceil((baseUsers * dnsQueries) / 5000);
    let totalSeats = Math.max(baseUsers, additionalSeats); // Ensure seats never decrease

    let allowedSeats = ea === "Yes" ? Math.ceil(totalSeats * 1.1) : totalSeats;
    let utilization = (dnsQueries / 5000) * 100;

    // SIG Usage Calculation
    let sigAverageBandwidth = subscription.includes("sig") ? (sigPeakBandwidth / 30).toFixed(2) : "";
    let sigUtilization = subscription.includes("sig") ? ((sigPeakBandwidth / 30) / 50 * 100).toFixed(2) : "";
    let additionalSigUsers = subscription.includes("sig") && parseFloat(sigUtilization) > 100
        ? Math.ceil((parseFloat(sigUtilization) - 100) * totalSeats / 100)
        : "";

    // Calculate Number of Existing Seats
    let existingSeats = employees + k12 + higherEd;

    // Calculate Total Seats Required Based on Low Utilization (DNS)
    let lowUtilizationSeats = "";
    if (subscription.startsWith("dns") && dnsQueries < 5000) {
        let actualSeatsRequired = Math.ceil(baseUsers * (dnsQueries / 5000));
        lowUtilizationSeats = actualSeatsRequired;
    }

    // Calculate Total SIG Seats Required Based on Low Utilization
    let sigLowUtilizationSeats = "";
    if (subscription.includes("sig") && sigPeakBandwidth < 1500) {
        let actualSigSeatsRequired = Math.ceil(baseUsers * (sigPeakBandwidth / 1500));
        sigLowUtilizationSeats = actualSigSeatsRequired;
    }

    // Display results
    document.getElementById("output").innerHTML = `
    <b>Subscription Tier:</b> ${subscription.replace("_", " ").toUpperCase()}<br>
    <b>Number of Existing Seats:</b> ${existingSeats}<br>
    ${!subscription.includes("sig") ? `<b>Total DNS Seats Required:</b> ${totalSeats}<br>` : ""}
    ${ea === "Yes" ? `<b>EA Allowed Seats:</b> ${allowedSeats}<br>` : ""}
    ${!subscription.includes("sig") ? `<b>DNS Utilization:</b> ${utilization.toFixed(2)}%<br>` : ""}
    ${subscription.includes("sig") ? `<b>SIG Average Bandwidth Per User:</b> ${sigAverageBandwidth} kbps/day<br>` : ""}
    ${subscription.includes("sig") ? `<b>SIG Utilization:</b> ${sigUtilization}%<br>` : ""}
    ${subscription.includes("sig") && additionalSigUsers ? `<b>Additional SIG Users Required:</b> ${additionalSigUsers}<br>` : ""}
    ${subscription.includes("sig") && !sigLowUtilizationSeats ? `<b>Total SIG Seat Count Required:</b> ${existingSeats + (additionalSigUsers || 0)}<br>` : ""}
    ${lowUtilizationSeats ? `<b>Total DNS Seats Required Based on Low Utilization:</b> ${lowUtilizationSeats}<br>` : ""}
    ${sigLowUtilizationSeats ? `<b>Total SIG Seats Required Based on Low Utilization:</b> ${sigLowUtilizationSeats}<br>` : ""}
    `;
}