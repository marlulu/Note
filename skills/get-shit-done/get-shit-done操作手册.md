# GSD Core 操作手册

> **Git. Ship. Done.**
> 一套轻量级的元提示、上下文工程与规范驱动开发系统，适用于 Claude Code、OpenCode、Gemini CLI、Kilo、Codex、Copilot、Cursor、Windsurf 等 AI 编程工具。

把需求说明白，让系统正确构建出来。

---

## 安装与更新

- 安装/更新：`npx @opengsd/gsd-core@latest`
- 跳过权限：`claude --dangerously-skip-permissions`

---

## 工作原理

每个里程碑重复相同的五步循环，每次推进一个阶段：

1. **讨论（Discuss）** — 在规划任何内容之前，先捕获实现决策
2. **规划（Plan）** — 研究、分解，并验证计划能够适配全新的上下文窗口
3. **执行（Execute）** — 以并行波次运行计划；每个执行器以干净的 20 万 token 上下文启动
4. **验证（Verify）** — 检查已构建的内容；在宣告完成前诊断并修复问题
5. **交付（Ship）** — 创建 PR，归档阶段，对下一个阶段重复上述流程

**讨论 → 规划 → 执行 → 验证 → 发布**

---

## 上下文工程

GSD 通过结构化工件解决**上下文腐化**问题——随着 AI 填满上下文窗口而逐渐累积的质量下降。繁重的工作在全新的子智能体中运行，结构化工件跨越会话边界保持存续。

| 文件 | 作用 |
|------|------|
| `PROJECT.md` | 项目愿景，始终加载 |
| `research/` | 生态知识（技术栈、功能、架构、坑点） |
| `REQUIREMENTS.md` | 带 phase 可追踪性的 v1/v2 范围定义 |
| `ROADMAP.md` | 你要去哪里、哪些已经完成 |
| `STATE.md` | 决策、阻塞、当前位置，跨会话记忆 |
| `PLAN.md` | 带 XML 结构和验证步骤的原子任务 |
| `SUMMARY.md` | 做了什么、改了什么、已写入历史 |
| `todos/` | 留待后续处理的想法和任务 |

---

## 新项目快速上手

```
/gsd-new-project   # 完整初始化：提问 → 研究 → 需求 → 路线图
```

然后按循环推进：

1. `/gsd-discuss-phase` — 讨论阶段，给出的信息越具体，系统越能构建出你真正想要的东西
2. `/gsd-plan-phase` — 规划阶段
3. `/gsd-execute-phase` — 执行阶段
4. `/gsd-verify-work` — 验证工作，进行测试验证是否可用

当所有阶段完成后，`/gsd-complete-milestone` 进行归档并打 release tag。

用 `/gsd-new-milestone` 开启下一个版本。

---

## 在已有项目上使用（Brownfield）

已有代码库想用 GSD 管理？不需要从头开始，按以下流程接入：

### 方式一：一键接入（推荐）

```
/gsd-onboard
```

自动完成三件事：
1. **代码库分析** — 用并行智能体扫描代码结构、技术栈、架构模式，输出到 `.planning/codebase/`
2. **文档摄取** — 如果仓库里已有 ADR、PRD、SPEC 等文档，自动合并到 `.planning/` 中
3. **项目初始化** — 生成 `PROJECT.md`、`REQUIREMENTS.md`、`ROADMAP.md`、`STATE.md`

可选参数：
- `--fast` — 快速扫描模式，只启动一个映射智能体（默认启动四个）
- `--text` — 纯文本模式，适合非 Claude 运行时

### 方式二：分步操作

如果想更精细地控制接入过程：

```
/gsd-map-codebase           # 第一步：分析代码库
/gsd-ingest-docs             # 第二步：摄取已有文档（可选）
/gsd-new-project             # 第三步：初始化项目结构
```

#### 代码库分析 `/gsd-map-codebase`

启动四个并行映射智能体，分别从不同角度分析代码库，输出 7 份结构化文档到 `.planning/codebase/`：

```
/gsd-map-codebase                  # 完整分析（4 个智能体并行）
/gsd-map-codebase --fast           # 快速模式（1 个智能体）
/gsd-map-codebase --fast --focus arch   # 只聚焦架构
/gsd-map-codebase --fast --focus tech   # 只聚焦技术栈
```

分析完成后可以用查询模式回顾：
```
/gsd-map-codebase status           # 查看分析状态
/gsd-map-codebase --query <关键词>  # 搜索代码库知识
/gsd-map-codebase diff             # 查看自上次分析以来的变化
/gsd-map-codebase refresh          # 刷新分析
```

#### 文档摄取 `/gsd-ingest-docs`

如果仓库里已有 ADR、PRD、SPEC 等文档，自动扫描并合并到 `.planning/` 中，保留已有决策上下文。

#### 导入外部计划 `/gsd-import`

将外部计划文件导入项目，自动检测与现有决策的冲突，安全合并。

### 接入后该做什么

接入完成后，和新项目一样按循环推进：

```
/gsd-progress              # 看看当前状态和下一步
/gsd-discuss-phase         # 从第一个阶段开始讨论
```

---

## 命令行参考

### 核心工作流

| 命令 | 作用 |
|------|------|
| `/gsd-new-project [--auto]` | 完整初始化：提问 → 研究 → 需求 → 路线图 |
| `/gsd-onboard [--fast]` | 接入已有代码库：映射 → 文档摄取 → 初始化 |
| `/gsd-discuss-phase [N] [--auto] [--analyze]` | 在规划前收集实现决策（--analyze 增加权衡分析） |
| `/gsd-plan-phase [N] [--auto] [--reviews]` | 为某个阶段执行研究 + 规划 + 验证 |
| `/gsd-execute-phase <N>` | 以并行 wave 执行全部计划，完成后验证 |
| `/gsd-verify-work [N]` | 人工用户验收测试 |
| `/gsd-ship [N] [--draft]` | 从已验证的阶段工作创建 PR |
| `/gsd-fast <text>` | 内联处理琐碎任务——完全跳过规划，立即执行 |
| `/gsd-quick [--full] [--discuss] [--research]` | 以 GSD 保障执行临时任务 |
| `/gsd-complete-milestone` | 归档里程碑并打 release tag |
| `/gsd-new-milestone [name]` | 开始下一个版本 |
| `/gsd-milestone-summary` | 从已完成的里程碑生成项目概览 |
| `/gsd-forensics` | 对失败或卡住的工作流进行事后调查 |
| `/gsd-autonomous` | 自动运行剩余所有阶段（讨论→规划→执行） |

### 导航与状态

| 命令 | 作用 |
|------|------|
| `/gsd-progress` | 我现在在哪？下一步是什么？ |
| `/gsd-progress --next` | 自动检测状态并执行下一步 |
| `/gsd-next` | 智能入口——检测项目状态并路由到正确的下一步 |
| `/gsd-help` | 显示全部命令和使用指南 |
| `/gsd-stats` | 显示项目统计——阶段、计划、需求、git 指标 |

### 阶段管理

| 命令 | 作用 |
|------|------|
| `/gsd-phase` | 在路线图末尾追加 phase |
| `/gsd-phase --insert [N]` | 在 phase 之间插入紧急工作 |
| `/gsd-phase --edit [N] [--force]` | 就地修改已有 phase 的任意字段 |
| `/gsd-phase --remove [N]` | 删除未来 phase，并重编号 |
| `/gsd-spec-phase` | 澄清阶段交付物，生成 SPEC.md |
| `/gsd-mvp-phase` | 以垂直 MVP 切片规划阶段 |
| `/gsd-ultraplan-phase` | [BETA] 将规划卸载到云端，浏览器中审查后导入 |
| `/gsd-discuss-phase --assumptions [N]` | 查看 Claude 打算采用的方案 |
| `/gsd-audit-milestone` | 验证里程碑是否达到完成定义 |
| `/gsd-audit-milestone --fix` | 为 audit 发现的缺口创建 phase |

### 代码质量与审查

| 命令 | 作用 |
|------|------|
| `/gsd-review` | 请求跨 AI 同行评审阶段计划 |
| `/gsd-code-review` | 审查阶段中修改的源文件——bug、安全、代码质量 |
| `/gsd-eval-review` | 审计 AI 阶段的评估覆盖度，生成修复计划 |
| `/gsd-pr-branch` | 创建过滤 .planning/ 提交的干净 PR 分支 |
| `/gsd-audit-uat` | 审计验证债务——找出缺少 UAT 的阶段 |
| `/gsd-audit-fix` | 自动审计→分类→修复→测试→提交 |
| `/gsd-secure-phase` | 回溯验证已完成阶段的安全防护措施 |
| `/gsd-validate-phase` | 回溯审计并填补验证空白 |
| `/gsd-plan-review-convergence` | 跨 AI 计划收敛——重新规划直到审查关切解决 |

### 代码库分析

| 命令 | 作用 |
|------|------|
| `/gsd-map-codebase` | 用并行智能体分析代码库，输出到 `.planning/codebase/` |
| `/gsd-map-codebase --fast` | 快速扫描（单智能体） |
| `/gsd-map-codebase --query <term>` | 查询代码库知识 |
| `/gsd-ingest-docs` | 从已有 ADR/PRD/SPEC 摄取文档到 .planning/ |
| `/gsd-import` | 导入外部计划，自动检测冲突 |

### 探索与调研

| 命令 | 作用 |
|------|------|
| `/gsd-explore` | 苏格拉底式探索——在提交计划前想清楚 idea |
| `/gsd-spike` | 通过体验式探索调研 idea |
| `/gsd-sketch` | 用临时 HTML 模型草拟 UI/设计想法 |

### 会话管理

| 命令 | 作用 |
|------|------|
| `/gsd-pause-work` | 暂停时创建交接上下文（写入 HANDOFF.json） |
| `/gsd-resume-work` | 从上一次会话恢复 |
| `/gsd-pause-work --report` | 生成会话摘要 |

### 积压与想法

| 命令 | 作用 |
|------|------|
| `/gsd-capture --seed <idea>` | 将想法存入积压停车场 |
| `/gsd-capture [desc]` | 记录一个待办想法 |
| `/gsd-capture --list` | 查看待办列表 |
| `/gsd-note <text>` | 零摩擦想法捕捉 |
| `/gsd-inbox` | 分诊 GitHub issues 和 PRs |
| `/gsd-review-backlog` | 审查并提升积压项到活跃里程碑 |

### 工作流与工作区

| 命令 | 作用 |
|------|------|
| `/gsd-workstreams list` | 显示所有工作流及其状态 |
| `/gsd-workstreams create <name>` | 创建命名空间工作流 |
| `/gsd-workstreams switch <name>` | 切换当前活跃工作流 |
| `/gsd-workstreams complete <name>` | 完成并合并工作流 |
| `/gsd-workspace --new` | 创建隔离工作区（worktree 或 clone） |
| `/gsd-workspace --list` | 显示所有工作区 |
| `/gsd-workspace --remove` | 移除工作区 |
| `/gsd-thread` | 管理跨会话的持久上下文线程 |

### UI 设计

| 命令 | 作用 |
|------|------|
| `/gsd-ui-phase [N]` | 为前端阶段生成 UI 设计合约（UI-SPEC.md） |
| `/gsd-ui-review [N]` | 对已实现前端代码进行 6 维视觉审计 |
| `/gsd-ai-integration-phase` | 为涉及 AI 系统的阶段生成 AI-SPEC.md |

### 工具与配置

| 命令 | 作用 |
|------|------|
| `/gsd-settings` | 配置模型 profile 和工作流代理 |
| `/gsd-config --profile <profile>` | 切换模型 profile（quality / balanced / budget） |
| `/gsd-debug [desc]` | 使用持久状态进行系统化调试 |
| `/gsd-do <text>` | 将自由文本自动路由到正确的 GSD 命令 |
| `/gsd-health [--repair]` | 校验 .planning/ 目录完整性 |
| `/gsd-update` | 更新 GSD，并预览变更日志 |
| `/gsd-surface` | 切换哪些 skills 被显示 |
| `/gsd-undo` | 安全回退——用 phase manifest 回滚提交 |
| `/gsd-cleanup` | 归档已完成里程碑的阶段目录 |
| `/gsd-add-tests` | 为已完成阶段生成测试 |
| `/gsd-extract-learnings` | 从已完成阶段提取决策、教训和模式 |
| `/gsd-docs-update` | 生成或更新项目文档 |
| `/gsd-manager` | 交互式命令中心——从一个终端管理多个阶段 |
| `/gsd-profile-user` | 生成开发者行为档案 |

---

## 参考链接

- GitHub：https://github.com/open-gsd/gsd-core.git
- npm：https://www.npmjs.com/package/@opengsd/gsd-core
- Discord：https://discord.gg/mYgfVNfA2r
