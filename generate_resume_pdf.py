import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle

def build_pdf():
    pdf_path = os.path.join(os.path.dirname(__file__), "Umar_Faruk_J_Resume.pdf")
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=32,
        bottomMargin=32
    )

    styles = getSampleStyleSheet()
    
    # Custom styles
    title_style = ParagraphStyle(
        'HeaderTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=22,
        alignment=1, # Center
        textColor=colors.HexColor('#0F172A'),
        spaceAfter=4
    )

    sub_style = ParagraphStyle(
        'HeaderSub',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
        alignment=1,
        textColor=colors.HexColor('#334155'),
        spaceAfter=3
    )

    contact_style = ParagraphStyle(
        'HeaderContact',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11,
        alignment=1,
        textColor=colors.HexColor('#475569'),
        spaceAfter=6
    )

    section_heading = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=13,
        textColor=colors.HexColor('#0F172A'),
        spaceBefore=7,
        spaceAfter=2
    )

    body_style = ParagraphStyle(
        'BodyDark',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.8,
        leading=12.2,
        textColor=colors.HexColor('#1E293B'),
        alignment=4 # Justify
    )

    entry_title = ParagraphStyle(
        'EntryTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=12,
        textColor=colors.HexColor('#0F172A')
    )

    entry_right = ParagraphStyle(
        'EntryRight',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=12,
        alignment=2, # Right
        textColor=colors.HexColor('#334155')
    )

    elements = []

    # Header
    elements.append(Paragraph("UMAR FARUK J", title_style))
    elements.append(Paragraph("WEB DEVELOPER &bull; UI/UX DESIGNER &bull; WORDPRESS DEVELOPER &bull; DATA ANALYST", sub_style))
    elements.append(Paragraph("Krishnagiri, Tamil Nadu-609304 | +918122259846 | umars81222@gmail.com", contact_style))
    elements.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#1E293B'), spaceBefore=1, spaceAfter=6))

    # Professional Summary
    elements.append(Paragraph("PROFESSIONAL SUMMARY", section_heading))
    elements.append(HRFlowable(width="100%", thickness=0.75, color=colors.HexColor('#CBD5E1'), spaceBefore=1, spaceAfter=4))
    elements.append(Paragraph(
        "Computer Science Engineering student with hands-on experience in web development, frontend technologies, REST API integration, database management, and WordPress development. Familiar with Java, JavaScript, HTML, CSS, React.js, SQL, Git/GitHub, and responsive web design. Experienced in developing academic and real-world web projects with a focus on problem-solving, debugging, usability, and maintainable solutions.",
        body_style
    ))
    elements.append(Spacer(1, 4))

    # Education
    elements.append(Paragraph("EDUCATION", section_heading))
    elements.append(HRFlowable(width="100%", thickness=0.75, color=colors.HexColor('#CBD5E1'), spaceBefore=1, spaceAfter=4))
    
    t1_data = [
        [Paragraph("<b>B.E. Computer Science and Engineering</b> &mdash; Mahendra Engineering College", entry_title),
         Paragraph("CGPA: 8.02 (2023 &ndash; 2027)", entry_right)]
    ]
    t1 = Table(t1_data, colWidths=[380, 160])
    t1.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
        ('TOPPADDING', (0,0), (-1,-1), 1),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    elements.append(t1)

    t2_data = [
        [Paragraph("<b>Higher Secondary Education</b> &mdash; Govt. Boys HSS, Uthangarai", entry_title),
         Paragraph("Score: 69% (2021 &ndash; 2023)", entry_right)]
    ]
    t2 = Table(t2_data, colWidths=[380, 160])
    t2.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
        ('TOPPADDING', (0,0), (-1,-1), 1),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    elements.append(t2)
    elements.append(Spacer(1, 4))

    # Core Skills
    elements.append(Paragraph("CORE SKILLS", section_heading))
    elements.append(HRFlowable(width="100%", thickness=0.75, color=colors.HexColor('#CBD5E1'), spaceBefore=1, spaceAfter=4))
    skills_text = (
        "<b>Programming:</b> Java, JavaScript &nbsp;&bull;&nbsp; "
        "<b>Web Development:</b> HTML5, CSS3, React.js, Tailwind CSS, Responsive Web Design<br/>"
        "<b>Backend &amp; APIs:</b> REST APIs, JSON, API Integration &nbsp;&bull;&nbsp; "
        "<b>Database:</b> MySQL, MongoDB, Database Management<br/>"
        "<b>Tools:</b> Git, GitHub, WordPress &nbsp;&bull;&nbsp; "
        "<b>UI/UX:</b> Figma, Wireframing, Prototyping, Information Architecture, Usability Principles<br/>"
        "<b>Other:</b> Problem Solving, Debugging, Troubleshooting, Team Collaboration"
    )
    elements.append(Paragraph(skills_text, body_style))
    elements.append(Spacer(1, 4))

    # Projects
    elements.append(Paragraph("PROJECTS", section_heading))
    elements.append(HRFlowable(width="100%", thickness=0.75, color=colors.HexColor('#CBD5E1'), spaceBefore=1, spaceAfter=4))

    # Project 1
    p1_header = [
        [Paragraph("<b>Hostel Room Allocation &amp; Student Management System</b>", entry_title),
         Paragraph("<i>Academic Project</i>", entry_right)]
    ]
    p1_t = Table(p1_header, colWidths=[390, 150])
    p1_t.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    elements.append(p1_t)
    elements.append(Paragraph(
        "Engineered an automated hostel room allocation framework that eliminated redundant manual processes and streamlined the overall workflow. Reduced manual data-entry effort and administrative errors by designing structured input flows and validation-driven interfaces. Designed and wireframed intuitive dashboard modules for administrators and students, improving data discovery and day-to-day management efficiency. The system was built to handle real-time allocation updates while keeping the interface simple for non-technical staff.",
        body_style
    ))
    elements.append(Spacer(1, 4))

    # Project 2
    p2_header = [
        [Paragraph("<b>Multi-Agent System for Social Media Optimization &amp; Engagement Prediction</b>", entry_title),
         Paragraph("<i>Academic Project</i>", entry_right)]
    ]
    p2_t = Table(p2_header, colWidths=[390, 150])
    p2_t.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    elements.append(p2_t)
    elements.append(Paragraph(
        "Engineered an intelligent multi-agent framework for social media content optimization and engagement prediction, analyzing captions, visuals, hashtags, and overall content quality. Developed recommendation modules to suggest content improvements, relevant hashtags, and optimal posting times based on predicted engagement. Designed an analytics dashboard to visualize engagement predictions and surface data-driven insights for content planning. The workflow combined design and data analysis to help creators make faster, more informed decisions.",
        body_style
    ))
    elements.append(Spacer(1, 4))

    # Internship Experience
    elements.append(Paragraph("INTERNSHIP EXPERIENCE", section_heading))
    elements.append(HRFlowable(width="100%", thickness=0.75, color=colors.HexColor('#CBD5E1'), spaceBefore=1, spaceAfter=4))

    # Intern 1
    i1_header = [
        [Paragraph("<b>DivineCore Technologies</b> &mdash; WordPress Developer Intern", entry_title),
         Paragraph("3-Month", entry_right)]
    ]
    i1_t = Table(i1_header, colWidths=[420, 120])
    i1_t.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    elements.append(i1_t)
    elements.append(Paragraph(
        "Created responsive WordPress websites using themes, plugins, and page builders. Designed simple layouts and handled basic hosting and deployment.",
        body_style
    ))
    elements.append(Spacer(1, 3))

    # Intern 2
    i2_header = [
        [Paragraph("<b>ServiceNow</b> &mdash; Virtual Internship", entry_title),
         Paragraph("2026", entry_right)]
    ]
    i2_t = Table(i2_header, colWidths=[420, 120])
    i2_t.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    elements.append(i2_t)
    elements.append(Paragraph(
        "Gained exposure to enterprise workflow and platform design principles through guided internship modules.",
        body_style
    ))
    elements.append(Spacer(1, 3))

    # Intern 3
    i3_header = [
        [Paragraph("<b>Salesforce</b> &mdash; Virtual Internship", entry_title),
         Paragraph("2025", entry_right)]
    ]
    i3_t = Table(i3_header, colWidths=[420, 120])
    i3_t.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    elements.append(i3_t)
    elements.append(Paragraph(
        "Completed structured modules on Salesforce platform fundamentals and agentic AI concepts under the Agentblazer program.",
        body_style
    ))
    elements.append(Spacer(1, 4))

    # Certifications
    elements.append(Paragraph("CERTIFICATIONS", section_heading))
    elements.append(HRFlowable(width="100%", thickness=0.75, color=colors.HexColor('#CBD5E1'), spaceBefore=1, spaceAfter=4))
    certs = (
        "&bull; <b>NPTEL:</b> Programming in Java (2025), Internet of Things &ndash; IoT (2026)<br/>"
        "&bull; <b>SALESFORCE:</b> Agentblazer Champion (2025), Agentblazer Innovator (2026)<br/>"
        "&bull; <b>GUVI:</b> Mastering Figma"
    )
    elements.append(Paragraph(certs, body_style))

    doc.build(elements)
    print(f"Resume generated at: {pdf_path} (size: {os.path.getsize(pdf_path)} bytes)")

if __name__ == "__main__":
    build_pdf()
