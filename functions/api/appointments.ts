// Cloudflare Pages Function for /api/appointments
export async function onRequestPost(context: any) {
  try {
    const body: any = await context.request.json();
    const { fullName, email, date, salon, message } = body;

    const errors: Record<string, string> = {};

    if (!fullName || typeof fullName !== "string" || fullName.trim().length < 2) {
      errors.fullName = "Please provide your full name (minimum 2 characters).";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      errors.email = "Please provide a valid email address for confidential correspondence.";
    }

    if (!date || typeof date !== "string") {
      errors.date = "Please select your preferred appointment date.";
    } else {
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (isNaN(selectedDate.getTime())) {
        errors.date = "The selected appointment date is invalid.";
      } else if (selectedDate < today) {
        errors.date = "Appointment dates must be scheduled for today or a future date.";
      }
    }

    if (Object.keys(errors).length > 0) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Validation failed for private appointment request.",
          errors,
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const randomHex = Math.floor(1000 + Math.random() * 9000).toString(16).toUpperCase();
    const appointmentId = `AL-2026-${randomHex}`;

    const appointment = {
      id: appointmentId,
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      date,
      salon: salon || "Geneva Flagship Atelier · Rue du Rhône",
      message: message || "",
      createdAt: new Date().toISOString(),
      status: "confirmed",
    };

    return new Response(
      JSON.stringify({
        success: true,
        message: "Your private viewing request has been confirmed by the Geneva Atelier.",
        appointment,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch {
    return new Response(
      JSON.stringify({
        success: false,
        message: "An internal atelier transmission error occurred.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
