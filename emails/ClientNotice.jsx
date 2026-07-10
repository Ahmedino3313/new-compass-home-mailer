import { Body, Container, Head, Html, Img, Link, Preview, Section, Text, Hr, } from "@react-email/components";

// Brand colors (from the compass logo) 
const colors = {
    primary: "#2D6768",    // dark teal - bottom of the shield
    accent: "#4CA27B",     // green - left side of the shield, used for the button
    buttonColor: "#1e3a5f", // navy - matches heading bar
    headerFrom: "#4696CB", // blue - the roof color, used for the header background
    text: "#1f2937",       // near-black, for normal text
    muted: "#6b7280",      // gray, for less important text
    border: "#e5e7eb",     // light gray, for thin divider lines
};

export default function ClientNotice({
    companyName = "Compass Home",
    logoUrl = "https://mail-images-asset.vercel.app/compasslogo.png",
    heading = "",
    recipientName = "",
    bodyText = "",
    buttonLabel = "Download Document",
    buttonUrl = "",
    senderName = "The CompassHome Team",
    senderTitle = "Customer Support",
    supportEmail = "hi@compasshome.info",
    websiteUrl = "https://compass.com",
    
    location = "90 5th Ave, New York, NY 10011",

    mapIconUrl = "https://mail-images-asset.vercel.app/map.png",
    facebookIconUrl = "https://mail-images-asset.vercel.app/facebook.png",
    instagramIconUrl = "https://mail-images-asset.vercel.app/instagram.png",
    linkedinIconUrl = "https://mail-images-asset.vercel.app/linkedin.png",
    xIconUrl = "https://mail-images-asset.vercel.app/x.png",
    downloadIconUrl = "https://mail-images-asset.vercel.app/download.png",

    facebookUrl = "https://www.facebook.com/share/18KguXspCt/?mibextid=wwXIfr",
    instagramUrl = "https://www.instagram.com/compass?igsh=bjBjdnExOXE5MTBo",
    linkedinUrl = "#",
    twitterUrl = "https://x.com/compass?s=21&t=KISyPALQmylJz6SCiOFynQ",
    }) {
    return (
        <Html>
        <Head />
        <Preview>{companyName} — your {heading.toLowerCase()} is ready to download.</Preview>
        <Body style={main}>
            <Container style={container}>
                {/* Header */}
                <Section style={logoHeader}>
                    <Img
                        src={logoUrl}
                        width="200"
                        alt={companyName}
                        style={{ display: "block", margin: "0 auto" }}
                    />
                    </Section>

                    {/* Heading bar - solid navy */}
                    <Section style={headingBar}>
                    <Text style={headingBarText}>{heading}</Text>
                </Section>

                {/* Body */}
                <Section style={body}>
                    <Text style={greeting}>Hi {recipientName},</Text>
                    {bodyText.split("\n").map((line, index) =>
                        line.trim() === "" ? null : (
                            <Text key={index} style={paragraph}>
                            {line}
                            </Text>
                        )
                    )}

                    <Hr style={hr} />

                    <Text style={paragraph}>
                        Best regards,
                        <br />
                        <strong>{senderName}</strong>
                        <br />
                        {senderTitle}, {companyName}
                    </Text>
                    
                    {buttonUrl ? (
                        <Section style={{ textAlign: "center", margin: "28px 0" }}>
                            <Link href={buttonUrl} style={button}>
                            <Img
                                src={downloadIconUrl}
                                width="16"
                                height="16"
                                alt=""
                                style={{ display: "inline-block", verticalAlign: "middle", marginRight: "8px" }}
                            />
                            <span style={{ verticalAlign: "middle" }}>{buttonLabel}</span>
                            </Link>
                        </Section>
                    ) : null}
                </Section>

                {/* Support */}
                <Section style={supportBox}>
                    <Text style={supportText}>
                        Need assistance? Simply reply to this email and our team will be
                        happy to help.
                    </Text>
                </Section>

                {/* Footer */}
                <Section style={footer}>
                    <Text style={footerText}>
                        <Img
                            src={mapIconUrl}
                            width="12"
                            height="12"
                            alt="location"
                            style={{ display: "inline-block", verticalAlign: "middle", marginRight: "4px" }}
                        />
                        {companyName} · {location}
                    </Text>

                    <Section style={{ textAlign: "center", margin: "16px 0" }}>
                        <Link href={facebookUrl} style={{ display: "inline-block", margin: "0 6px" }}>
                            <Img src={facebookIconUrl} width="24" height="24" alt="Facebook" />
                        </Link>
                        <Link href={instagramUrl} style={{ display: "inline-block", margin: "0 6px" }}>
                            <Img src={instagramIconUrl} width="24" height="24" alt="Instagram" />
                        </Link>
                        <Link href={linkedinUrl} style={{ display: "inline-block", margin: "0 6px" }}>
                            <Img src={linkedinIconUrl} width="24" height="24" alt="LinkedIn" />
                        </Link>
                        <Link href={twitterUrl} style={{ display: "inline-block", margin: "0 6px" }}>
                            <Img src={xIconUrl} width="24" height="24" alt="X" />
                        </Link>
                    </Section>

                    <Text style={footerText}>
                        <Link href={websiteUrl} style={footerLink}>
                        {websiteUrl.replace("https://", "")}
                        </Link>{" "}
                        ·{" "}
                        <Link href={`mailto:${supportEmail}`} style={footerLink}>
                        {supportEmail}
                        </Link>
                    </Text>

                    <Hr style={hr} />

                    <Text style={footerSmall}>
                        &copy; {new Date().getFullYear()} {companyName}. All rights reserved.
                    </Text>
                </Section>
            </Container>
        </Body>
        </Html>
    );
}


// ── Styles ────────────────────────────────────────────────────────────
const main = {
    backgroundColor: "#f3f4f6",
    fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    padding: "24px 0",
};

const container = {
    backgroundColor: "#ffffff",
    maxWidth: "560px",
    margin: "0 auto",
    borderRadius: "10px",
    overflow: "hidden",
    border: `1px solid ${colors.border}`,
    };

const logoHeader = {
    padding: "28px 32px 20px 32px",
    textAlign: "center",
    backgroundColor: "#ffffff", 
};

const headingBar = {
    backgroundColor: colors.buttonColor,
    padding: "16px 32px",
    textAlign: "center",
};

const headingBarText = {
    color: "#ffffff",
    fontSize: "18px",
    fontWeight: "700",
    letterSpacing: "0.5px",
    margin: 0,
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
};

const greeting = {
    fontSize: "16px",
    fontWeight: "700",
    color: colors.text,
    margin: "0 0 12px 0",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
};

const body = {
    padding: "32px",
};


const paragraph = {
    fontSize: "15px",
    lineHeight: "24px",
    color: colors.text,
    margin: "0 0 12px 0",
    textAlign: "justify",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
};

const button = {
    backgroundColor: colors.buttonColor,
    borderRadius: "6px",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: "600",
    textDecoration: "none",
    textAlign: "center",
    display: "inline-block",
    padding: "12px 28px",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
};

const hr = {
    borderColor: colors.border,
    margin: "24px 0",
};

const supportBox = {
    margin: "0 32px 24px 32px",
    padding: "14px 18px",
    backgroundColor: "#eef6f4",
    borderRadius: "8px",
    borderLeft: `3px solid ${colors.accent}`,
};

const supportText = {
    fontSize: "14px",
    lineHeight: "20px",
    color: colors.primary,
    margin: 0,
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
};

const footer = {
    padding: "20px 32px 28px 32px",
    backgroundColor: "#f9fafb",
    borderTop: `1px solid ${colors.border}`,
    textAlign: "center",
};

const footerText = {
    fontSize: "13px",
    color: colors.muted,
    margin: "0 0 6px 0",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
};

const footerLink = {
    color: colors.primary,
    textDecoration: "none",
};


const footerSmall = {
    fontSize: "11px",
    color: "#6b7280",
    margin: 0,
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
};

ClientNotice.PreviewProps = {
    recipientName: "Ahmed",
    heading: "RENTAL APPLICATION FORM",
    bodyText:
        "Thank you for your interest in renting with Compass Home.\n\nAttached is the rental application form for your review and completion. Please fill out all required sections and return the completed form at your earliest convenience.\n\nOnce we receive your completed application, our team will begin the review process.",
    buttonLabel: "Download Rental Application Form",
    buttonUrl: "https://compassproperties.info/forms/rental-application.pdf",
};