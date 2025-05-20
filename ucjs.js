document.getElementById("subscription").addEventListener("change", updateSubscription);
document.querySelectorAll("input, select").forEach(el => el.addEventListener("input", updateSeats));

function updateSubscription() {
    let subscription = document.getElementById("subscription").value;
    let k12Field = document.getElementById("k12_students");
    let higherEdField = document.getElementById("higher_ed_students");
    let sigPeakField = document.getElementById("sig_peak_bandwidth");

    // Ensure users select a valid subscription tier before proceeding
    if (subscription === "select") {
        document.getElementById("output").style.display = "none"; // Hide output until a valid tier is chosen
        return;
    }

    // If DNS for EDU is selected, disable K-12 & Higher Ed input fields
    if (subscription === "dns_edu") {
        k12Field.value = "";
        higherEdField.value = "";
        k12Field.disabled = true;
        higherEdField.disabled = true;
    } else {
        k12Field.disabled = false;
        higherEdField.disabled = false;
    }

    // Enable SIG Peak Bandwidth input only if the subscription tier contains "sig" anywhere in its name
    sigPeakField.disabled = !subscription.includes("sig");
}

function calculateSeats() {
    let subscription = document.getElementById("subscription").value;

    // Prevent calculation if no valid tier is selected
    if (subscription === "select") {
        alert("Please select a valid subscription tier before calculating.");
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

    // Prevent both student categories from being populated
    if (k12 > 0 && higherEd > 0) {
        alert("Only one student category should be populated.");
        return;
    }

    // Calculate total seats required
    let baseUsers = employees + k12 + higherEd;
    let additionalSeats = Math.ceil((baseUsers * dnsQueries) / 5000);
    let totalSeats = Math.max(baseUsers, additionalSeats); // Ensure seats never decrease

    let allowedSeats = ea === "Yes" ? Math.ceil(totalSeats * 1.1) : totalSeats;
    let utilization = (dnsQueries / 5000) * 100;

    // SIG Usage Calculation (Triggers for any subscription tier containing "SIG" Case sensitive)
    let sigAverageBandwidth = subscription.includes("sig") ? (sigPeakBandwidth / 30).toFixed(2) : "";
    let sigUtilization = subscription.includes("sig") ? ((sigPeakBandwidth / 30) / 50 * 100).toFixed(2) : "";
    let additionalSigUsers = subscription.includes("sig") && parseFloat(sigUtilization) > 100
        ? Math.ceil((parseFloat(sigUtilization) - 100) * totalSeats / 100)
        : "";

    // Calculate Total Seats Required Based on Low Utilization (Only if subscription starts with "dns" and queries < 5000)
    let lowUtilizationSeats = "";
    if (subscription.startsWith("dns") && dnsQueries < 5000) {
        let actualSeatsRequired = Math.ceil(baseUsers * (dnsQueries / 5000)); // Adjusted seat count based on lower utilization
        lowUtilizationSeats = actualSeatsRequired;
    }

    // Display results
    document.getElementById("output").innerHTML = `
    <b>Subscription Tier:</b> ${subscription.replace("_", " ").toUpperCase()}<br>
    <b>Total Seats Required:</b> ${totalSeats}<br>
    <b>EA Allowed Seats:</b> ${allowedSeats}<br>
    <b>Utilization:</b> ${utilization.toFixed(2)}%<br>
    ${subscription.includes("sig") ? `<b>SIG Average Bandwidth Per User:</b> ${sigAverageBandwidth} kbps/day<br>` : ""}
    ${subscription.includes("sig") ? `<b>SIG Utilization:</b> ${sigUtilization}%<br>` : ""}
    ${subscription.includes("sig") ? `<b>Additional SIG Users Required:</b> ${additionalSigUsers}<br>` : ""}
    ${lowUtilizationSeats ? `<b>Total Seats Required Based on Low Utilization:</b> ${lowUtilizationSeats}<br>` : ""}
`;

}
