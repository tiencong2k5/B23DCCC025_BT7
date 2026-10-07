import './App.css'

type Skill = {
  name: string
  level: number
  category: string
}

type SectionProps = {
  id: string
  number: string
  title: string
  children: React.ReactNode
}

const skills: Skill[] = [
  { name: 'Figma', level: 92, category: 'Thiết kế' },
  { name: 'UI Design', level: 88, category: 'Thiết kế' },
  { name: 'UX Research', level: 78, category: 'Thiết kế' },
  { name: 'Design System', level: 84, category: 'Thiết kế' },
  { name: 'HTML & CSS', level: 72, category: 'Khác' },
  { name: 'Prototyping', level: 86, category: 'Khác' },
]

function Section({ id, number, title, children }: SectionProps) {
  return (
    <section className="cv-section" id={id}>
      <div className="section-heading">
        <span className="section-number">{number}</span>
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  )
}

function ProfileHeader() {
  return (
    <header className="profile-header">
      <a className="wordmark" href="#top" aria-label="Về đầu trang">
        linh<span>.</span>
      </a>
      <nav aria-label="Điều hướng CV">
        <a href="#experience">Kinh nghiệm</a>
        <a href="#projects">Dự án</a>
        <a href="#contact">Liên hệ</a>
      </nav>
      <a className="availability" href="mailto:hello@linhnguyen.design">
        <span /> Sẵn sàng kết nối
      </a>
    </header>
  )
}

function ProfileCard() {
  return (
    <aside className="profile-card" id="top">
      <div className="portrait-wrap">
        <img
          className="portrait"
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=720&q=85"
          alt="Chân dung Nguyễn Khánh Linh"
        />
        <span className="portrait-caption">HÀ NỘI, VIỆT NAM</span>
        <span className="portrait-spark" aria-hidden="true">✳</span>
      </div>
      <p className="eyebrow">XIN CHÀO, MÌNH LÀ</p>
      <h1>Nguyễn Khánh<br />Linh<span>.</span></h1>
      <p className="profile-role">Product Designer <span>·</span> UI/UX</p>
      <p className="profile-intro">
        Mình biến những vấn đề phức tạp thành trải nghiệm số đơn giản, hữu ích
        và thật dễ mến.
      </p>
      <div className="profile-divider" />
      <div className="contact-list" id="contact">
        <a href="mailto:hello@linhnguyen.design"><span>Email</span>hello@linhnguyen.design</a>
        <a href="tel:+84901234567"><span>Điện thoại</span>+84 901 234 567</a>
        <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer"><span>LinkedIn</span>linkedin.com/in/khanhlinh</a>
        <a href="https://dribbble.com/" target="_blank" rel="noreferrer"><span>Portfolio</span>linhnguyen.design</a>
      </div>
      <a className="download-link" href="mailto:hello@linhnguyen.design">
        <span>✳</span> Bắt đầu một cuộc trò chuyện <span aria-hidden="true">↗</span>
      </a>
      <p className="profile-note">© 2025 · ĐƯỢC THIẾT KẾ BẰNG SỰ TÒ MÒ</p>
    </aside>
  )
}

function TimelineItem({
  date,
  role,
  company,
  description,
  tags,
}: {
  date: string
  role: string
  company: string
  description: string
  tags: string[]
}) {
  return (
    <article className="timeline-item">
      <p className="timeline-date">{date}</p>
      <div className="timeline-content">
        <h3>{role}</h3>
        <p className="company">{company}</p>
        <p className="item-description">{description}</p>
        <div className="tag-list">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
      </div>
    </article>
  )
}

function SkillsSection({ items }: { items: Skill[] }) {
  return (
    <Section id="skills" number="03" title="Kỹ năng">
      <div className="skills-grid">
        {items.map((skill) => (
          <div className="skill" key={skill.name}>
            <div className="skill-label"><span>{skill.name}</span><span>{skill.level}%</span></div>
            <div className="skill-track" role="progressbar" aria-label={skill.name} aria-valuenow={skill.level} aria-valuemin={0} aria-valuemax={100}>
              <span style={{ width: `${skill.level}%` }} />
            </div>
          </div>
        ))}
      </div>
      <p className="skill-note">Công cụ mình thường dùng: Figma, FigJam, Webflow, Notion và một tách cà phê ngon.</p>
    </Section>
  )
}

function ProjectCard({
  number,
  title,
  description,
  category,
}: {
  number: string
  title: string
  description: string
  category: string
}) {
  return (
    <article className="project-card">
      <span className="project-number">{number}</span>
      <div><h3>{title}</h3><p>{description}</p></div>
      <span className="project-category">{category}</span>
      <span className="project-arrow" aria-hidden="true">↗</span>
    </article>
  )
}

function App() {

  return (
    <div className="page-shell">
      <ProfileHeader />
      <main className="resume-layout">
        <ProfileCard />
        <div className="resume-content">
          <Section id="about" number="01" title="Một chút về mình">
            <div className="about-copy">
              <p className="lead">Mình tin rằng thiết kế tốt không cần lên tiếng thật to. Nó chỉ cần khiến mọi thứ trở nên <em>rõ ràng hơn</em>.</p>
              <p>Với hơn 4 năm làm việc trong lĩnh vực sản phẩm số, mình đồng hành cùng các đội ngũ từ lúc tìm hiểu vấn đề đến khi hoàn thiện từng chi tiết giao diện. Mình thích đặt câu hỏi, làm việc sát với người dùng và biến dữ liệu thành những quyết định thiết kế có ý nghĩa.</p>
            </div>
            <div className="stats-row">
              <div><strong>04<span>+</span></strong><span>Năm kinh nghiệm</span></div>
              <div><strong>18</strong><span>Sản phẩm đã làm</span></div>
              <div><strong>06</strong><span>Đội ngũ đồng hành</span></div>
            </div>
          </Section>

          <Section id="experience" number="02" title="Kinh nghiệm">
            <div className="timeline">
              <TimelineItem date="2022 — HIỆN TẠI" role="Product Designer" company="Mây Studio · Hà Nội" description="Thiết kế trải nghiệm cho sản phẩm SaaS B2B; dẫn dắt quy trình discovery, xây dựng design system và phối hợp cùng đội ngũ phát triển." tags={['Product design', 'B2B SaaS', 'Design system']} />
              <TimelineItem date="2020 — 2022" role="UI/UX Designer" company="Lá Digital · Hà Nội" description="Thiết kế website và ứng dụng di động cho các thương hiệu bán lẻ, giáo dục; thực hiện nghiên cứu người dùng và kiểm thử prototype." tags={['UX research', 'Mobile app', 'E-commerce']} />
            </div>
          </Section>

          <Section id="projects" number="04" title="Dự án chọn lọc">
            <div className="projects-list">
              <ProjectCard number="01" title="Một — Quản lý tài chính" description="Ứng dụng giúp người trẻ theo dõi chi tiêu và xây dựng thói quen tài chính lành mạnh." category="FINTECH · 2024" />
              <ProjectCard number="02" title="Học cùng — Nền tảng học tập" description="Thiết kế lại trải nghiệm học trực tuyến, giúp học viên dễ dàng duy trì động lực." category="EDTECH · 2023" />
              <ProjectCard number="03" title="Mầm — Cửa hàng xanh" description="Trải nghiệm mua sắm thân thiện cho các sản phẩm sống bền vững." category="E-COMMERCE · 2022" />
            </div>
          </Section>

          <SkillsSection items={skills} />

          <Section id="education" number="05" title="Học vấn">
            <div className="education-row">
              <p className="timeline-date">2016 — 2020</p>
              <div><h3>Thiết kế đồ họa</h3><p className="company">Đại học Kiến trúc Hà Nội</p></div>
              <span className="education-mark">BA</span>
            </div>
          </Section>

          <footer className="content-footer">
            <span>THIẾT KẾ VỚI SỰ TÒ MÒ, HOÀN THIỆN BẰNG SỰ TẬN TÂM.</span>
            <a href="#top">Lên đầu trang ↑</a>
          </footer>
        </div>
      </main>
    </div>
  )
}

export default App
