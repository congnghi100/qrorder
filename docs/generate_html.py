import json
import os

md_path = "/Users/nghikieu/dev/outsource/MiniAppPOS/docs/BRD_QRCode_Ordering.md"
html_path = "/Users/nghikieu/dev/outsource/MiniAppPOS/docs/BRD_QRCode_Ordering.html"

with open(md_path, 'r', encoding='utf-8') as f:
    md_content = f.read()

# Safe string for javascript
md_json = json.dumps(md_content)

html_template = f"""<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BRD - QR Dine-in Ordering</title>
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <style>
        :root {{
            --sidebar-bg: #f8f9fa;
            --sidebar-text: #495057;
            --main-bg: #ffffff;
            --primary-color: #0d6efd;
            --table-header-bg: #e7f1ff;
            --table-border: #dee2e6;
            --text-color: #212529;
            --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        }}

        body {{
            margin: 0;
            padding: 0;
            font-family: var(--font-family);
            display: flex;
            height: 100vh;
            color: var(--text-color);
            background-color: var(--main-bg);
            overflow: hidden;
        }}

        /* Mobile Header - Hidden on Desktop */
        .mobile-header {{
            display: none;
            background-color: var(--main-bg);
            border-bottom: 1px solid var(--table-border);
            padding: 1rem;
            align-items: center;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 1000;
            box-sizing: border-box;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
            transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }}

        .mobile-header.hide {{
            transform: translateY(-100%);
        }}

        .hamburger-btn {{
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: var(--primary-color);
            margin-right: 1rem;
            padding: 0.2rem 0.5rem;
        }}
        
        .mobile-title {{
            font-weight: 600;
            font-size: 1.1rem;
            color: var(--text-color);
            margin: 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }}

        /* Sidebar Styles */
        .sidebar {{
            width: 320px;
            background-color: var(--sidebar-bg);
            border-right: 1px solid var(--table-border);
            padding: 2.5rem 1rem;
            overflow-y: auto;
            flex-shrink: 0;
            /* Smooth hardware-accelerated transition */
            transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.4s ease;
        }}

        .sidebar-title {{
            font-size: 0.85rem;
            font-weight: 700;
            color: #6c757d;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 2rem;
            padding-left: 1rem;
        }}

        .nav-link {{
            display: block;
            padding: 0.85rem 1rem;
            color: var(--sidebar-text);
            text-decoration: none;
            font-size: 0.95rem;
            border-radius: 6px;
            margin-bottom: 0.25rem;
            transition: all 0.2s ease;
            line-height: 1.4;
        }}

        .nav-link:hover {{
            background-color: #e2e6ea;
            color: #212529;
        }}

        .nav-link.active {{
            background-color: #e7f1ff;
            color: var(--primary-color);
            font-weight: 600;
        }}

        /* Main Content Styles */
        .main-content {{
            flex-grow: 1;
            padding: 3rem 5rem;
            overflow-y: auto;
            scroll-behavior: smooth;
        }}

        .content-wrapper {{
            max-width: 950px;
            margin: 0 auto;
        }}

        /* Markdown Styles */
        h1 {{
            color: var(--primary-color);
            font-size: 2.2rem;
            border-bottom: 3px solid var(--primary-color);
            padding-bottom: 0.8rem;
            margin-bottom: 2.5rem;
            display: flex;
            align-items: center;
            gap: 12px;
        }}

        h2 {{
            font-size: 1.5rem;
            margin-top: 3.5rem;
            margin-bottom: 1.5rem;
            color: #212529;
            border-bottom: 1px solid var(--table-border);
            padding-bottom: 0.5rem;
        }}

        h3 {{
            font-size: 1.25rem;
            margin-top: 2rem;
            margin-bottom: 1rem;
            color: #343a40;
        }}

        p {{
            line-height: 1.7;
            margin-bottom: 1.2rem;
            font-size: 1.05rem;
            text-align: justify;
        }}

        /* Table Styles */
        table {{
            width: 100%;
            border-collapse: collapse;
            margin: 2rem 0;
            font-size: 0.95rem;
            box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }}

        th, td {{
            padding: 1.2rem 1rem;
            border: 1px solid var(--table-border);
            text-align: left;
            vertical-align: top;
            line-height: 1.5;
        }}

        th {{
            background-color: var(--table-header-bg);
            color: var(--primary-color);
            font-weight: 600;
            white-space: nowrap;
        }}

        tbody tr:nth-child(even) {{
            background-color: #f8f9fa;
        }}
        
        tbody tr:hover {{
            background-color: #f1f3f5;
        }}

        /* Other Markdown Elements */
        hr {{
            border: 0;
            border-top: 1px dashed #ced4da;
            margin: 3rem 0;
        }}

        blockquote {{
            border-left: 4px solid var(--primary-color);
            margin: 1.5rem 0;
            padding: 0.75rem 1.5rem;
            background-color: #f8f9fa;
            color: #495057;
            border-radius: 0 4px 4px 0;
        }}

        ul, ol {{
            line-height: 1.7;
            margin-bottom: 1.5rem;
            font-size: 1.05rem;
        }}

        li {{
            margin-bottom: 0.5rem;
            text-align: justify;
        }}
        
        code {{
            background-color: #f8f9fa;
            padding: 0.2em 0.4em;
            border-radius: 3px;
            font-family: ui-monospace, SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
            font-size: 0.9em;
            color: #d63384;
        }}

        /* Overlay for mobile */
        .sidebar-overlay {{
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 1040;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease, visibility 0.3s ease;
        }}

        .sidebar-overlay.show {{
            opacity: 1;
            visibility: visible;
        }}

        /* ========================================================================= */
        /* RESPONSIVE STYLES (MOBILE)                                                */
        /* ========================================================================= */
        @media (max-width: 768px) {{
            body {{
                flex-direction: column;
                height: auto;
                overflow: visible; /* Native body scrolling */
            }}
            
            .mobile-header {{
                display: flex;
            }}
            
            .sidebar {{
                position: fixed;
                top: 0;
                left: 0;
                bottom: 0;
                height: 100%;
                z-index: 1050;
                border-right: none;
                padding-top: 2rem; 
                transform: translateX(-100%);
                box-shadow: none;
            }}
            
            .sidebar.show {{
                transform: translateX(0);
                box-shadow: 2px 0 10px rgba(0,0,0,0.15);
            }}

            .main-content {{
                padding: 1.5rem 1rem;
                padding-top: 80px; /* Space for the fixed header */
                overflow-y: visible; /* Let the body handle scrolling */
            }}

            h1 {{
                font-size: 1.6rem;
                flex-direction: column;
                align-items: flex-start;
                gap: 8px;
            }}

            h2 {{
                font-size: 1.3rem;
                margin-top: 2rem;
            }}

            table {{
                display: block; /* Makes table scrollable horizontally */
                overflow-x: auto;
                white-space: nowrap;
                -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
            }}
            
            th, td {{
                padding: 0.8rem 0.5rem;
            }}
            
            .content-wrapper {{
                width: 100%;
            }}
        }}
    </style>
</head>
<body>
    <!-- Mobile Header -->
    <div class="mobile-header" id="mobile-header">
        <button class="hamburger-btn" id="hamburger-btn" aria-label="Toggle Navigation">☰</button>
        <h1 class="mobile-title">BRD - QR Dine-in Ordering</h1>
    </div>

    <!-- Sidebar Overlay for Mobile -->
    <div class="sidebar-overlay" id="sidebar-overlay"></div>

    <div class="sidebar" id="sidebar">
        <div class="sidebar-title">NỘI DUNG</div>
        <div id="toc"></div>
    </div>
    
    <div class="main-content" id="main-scroll">
        <div class="content-wrapper" id="content">
            <!-- Content will be rendered here -->
        </div>
    </div>

    <script>
        const markdownContent = {md_json};

        marked.use({{
            gfm: true,
            breaks: true
        }});

        const htmlContent = marked.parse(markdownContent);
        document.getElementById('content').innerHTML = htmlContent;

        const contentDiv = document.getElementById('content');
        const headings = contentDiv.querySelectorAll('h2');
        const tocDiv = document.getElementById('toc');

        headings.forEach((heading, index) => {{
            const id = 'section-' + index;
            heading.id = id;

            let text = heading.textContent;

            const link = document.createElement('a');
            link.href = '#' + id;
            link.className = 'nav-link';
            if (index === 0) link.classList.add('active'); // active item đầu tiên
            link.textContent = text;
            tocDiv.appendChild(link);
        }});

        const mainScroll = document.getElementById('main-scroll');
        const links = document.querySelectorAll('.nav-link');
        
        // Mobile Sidebar Toggle Logic
        const hamburgerBtn = document.getElementById('hamburger-btn');
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebar-overlay');
        const mobileHeader = document.getElementById('mobile-header');
        
        function toggleSidebar() {{
            sidebar.classList.toggle('show');
            overlay.classList.toggle('show');
            if (sidebar.classList.contains('show')) {{
                document.body.style.overflow = 'hidden'; // Prevent body scroll when sidebar open
            }} else {{
                document.body.style.overflow = '';
            }}
        }}

        hamburgerBtn.addEventListener('click', toggleSidebar);
        overlay.addEventListener('click', toggleSidebar);

        // Smart Header Logic (Hide on scroll down, show on scroll up)
        let lastScrollY = window.scrollY || document.documentElement.scrollTop;

        function handleScroll() {{
            const isMobile = window.innerWidth <= 768;
            const scrollContainer = isMobile ? window : mainScroll;
            const scrollTop = isMobile ? (window.scrollY || document.documentElement.scrollTop) : mainScroll.scrollTop;
            
            // Smart Header (Mobile only)
            if (isMobile) {{
                if (scrollTop > lastScrollY && scrollTop > 60) {{
                    // Scrolling down - Hide header
                    mobileHeader.classList.add('hide');
                }} else {{
                    // Scrolling up - Show header
                    mobileHeader.classList.remove('hide');
                }}
                lastScrollY = scrollTop;
            }}

            // ScrollSpy Logic
            let current = '';
            headings.forEach(heading => {{
                // Trên mobile, offsetTop so với body. Trên desktop, offsetTop so với mainScroll
                const headingTop = isMobile ? heading.getBoundingClientRect().top + scrollTop : heading.offsetTop;
                if (scrollTop >= headingTop - 120) {{
                    current = heading.getAttribute('id');
                }}
            }});

            links.forEach(link => {{
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {{
                    link.classList.add('active');
                }}
            }});
            
            if (scrollTop <= 10 && links.length > 0) {{
                links.forEach(link => link.classList.remove('active'));
                links[0].classList.add('active');
            }}
        }}

        mainScroll.addEventListener('scroll', handleScroll);
        window.addEventListener('scroll', handleScroll);
        
        links.forEach(link => {{
            link.addEventListener('click', function(e) {{
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                // Đóng sidebar nếu đang ở mobile
                if (window.innerWidth <= 768 && sidebar.classList.contains('show')) {{
                    toggleSidebar();
                }}

                if (targetElement) {{
                    const isMobile = window.innerWidth <= 768;
                    if (isMobile) {{
                        // Đảm bảo header hiện ra khi click chuyển section
                        mobileHeader.classList.remove('hide');
                        window.scrollTo({{
                            top: targetElement.getBoundingClientRect().top + (window.scrollY || document.documentElement.scrollTop) - 70,
                            behavior: 'smooth'
                        }});
                    }} else {{
                        mainScroll.scrollTo({{
                            top: targetElement.offsetTop - 50,
                            behavior: 'smooth'
                        }});
                    }}
                }}
            }});
        }});
    </script>
</body>
</html>
"""

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html_template)

print(f"Generated {html_path} with smart mobile header")
