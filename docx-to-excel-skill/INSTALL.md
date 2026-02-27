# docx-to-excel 技能安装指南

## 技能概述

docx-to-excel 是一个openclaw技能，用于从Word文档提取结构化数据并生成Excel文件。支持多种提取模式和输出格式。

## 系统要求

- Python 3.8 或更高版本
- LobsterAI 环境
- 足够的磁盘空间存储技能文件

## 安装步骤

### 方法1：手动安装（推荐）

1. **下载技能包**
   - 将 `docx-to-excel-skill` 目录复制到LobsterAI技能目录：
     ```
     /Users/chehx/Library/Application Support/LobsterAI/SKILLs/
     ```

2. **安装Python依赖**
   ```bash
   pip install python-docx openpyxl pandas
   ```

3. **验证安装**
   - 重启LobsterAI
   - 技能应自动出现在可用技能列表中

### 方法2：使用技能管理器

如果LobsterAI支持技能管理器：
1. 将技能包导入技能管理器
2. 点击"安装"按钮
3. 等待安装完成

## 目录结构

```
docx-to-excel/
├── SKILL.md                    # 技能主文件（LobsterAI自动读取）
├── README.md                   # 用户使用指南
├── INSTALL.md                  # 本安装文档
├── requirements.txt            # Python依赖列表
├── scripts/                    # Python脚本
│   ├── extract_tables.py      # 表格提取脚本
│   ├── extract_fields.py      # 字段提取脚本
│   └── batch_process.py       # 批量处理脚本
├── references/                 # 参考文档
│   ├── word_structure.md      # Word文档结构详解
│   └── excel_formats.md       # Excel格式指南
├── templates/                  # Excel模板
│   └── basic_template.xlsx    # 基础模板
└── scripts/examples/          # 示例文件
    └── sample_config.json     # 示例配置文件
```

## 依赖安装

### 必需依赖
```bash
pip install python-docx openpyxl pandas
```

### 可选依赖（高级功能）
```bash
pip install xlrd xlwt XlsxWriter python-pptx
```

### 开发依赖
```bash
pip install pytest black flake8
```

## 配置技能

### 1. 环境变量（可选）
```bash
export DOCX_TO_EXCEL_TEMPLATE_DIR="/path/to/templates"
export DOCX_TO_EXCEL_OUTPUT_DIR="/path/to/output"
```

### 2. 技能配置
技能会自动读取以下位置的配置文件：
- `~/.docx-to-excel/config.json` - 用户配置
- 当前目录下的 `docx_to_excel_config.json`

## 测试安装

### 1. 验证Python依赖
```bash
python3 -c "import docx, openpyxl, pandas; print('依赖安装成功')"
```

### 2. 测试脚本
```bash
cd /path/to/docx-to-excel-skill/scripts
python3 extract_tables.py --help
```

### 3. 测试技能触发
在LobsterAI中：
1. 输入："从Word文档提取表格到Excel"
2. 技能应自动触发并提供指导

## 故障排除

### 常见问题

#### 1. 技能未显示
- 检查技能目录位置是否正确
- 重启LobsterAI
- 查看LobsterAI日志

#### 2. Python依赖安装失败
```bash
# 使用虚拟环境
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

#### 3. 脚本执行错误
- 检查Python版本：`python3 --version`
- 检查文件权限：`chmod +x scripts/*.py`
- 查看错误日志

#### 4. Word文档读取失败
- 确保是有效的.docx文件
- 检查文件编码
- 尝试用Word重新保存文件

### 日志查看

#### LobsterAI日志
- 查看LobsterAI应用日志
- 检查技能加载日志

#### Python脚本日志
```bash
# 启用详细日志
python3 scripts/extract_tables.py input.docx --output output.xlsx --verbose
```

## 升级技能

### 手动升级
1. 备份现有技能目录
2. 下载新版本技能包
3. 覆盖旧文件
4. 更新依赖：`pip install -r requirements.txt --upgrade`

### 自动升级（如果支持）
通过LobsterAI技能管理器进行升级。

## 卸载技能

### 方法1：手动卸载
1. 删除技能目录：
   ```bash
   rm -rf "/Users/chehx/Library/Application Support/LobsterAI/SKILLs/docx-to-excel"
   ```
2. 移除Python依赖（可选）：
   ```bash
   pip uninstall python-docx openpyxl pandas
   ```

### 方法2：使用技能管理器
通过LobsterAI技能管理器卸载。

## 技能集成

### 与LobsterAI集成
技能会自动集成到LobsterAI的以下功能：
- 技能菜单
- 上下文感知触发
- 工作流自动化

### 与其他工具集成
技能脚本可以独立使用：
```bash
# 独立使用提取脚本
python3 /path/to/docx-to-excel/scripts/extract_tables.py document.docx
```

## 支持与反馈

### 获取帮助
1. 查看 `README.md` 获取使用指南
2. 查看 `references/` 目录获取技术文档
3. 运行 `python3 scripts/*.py --help` 查看命令行帮助

### 报告问题
1. 描述问题现象
2. 提供错误日志
3. 说明复现步骤
4. 提供测试文件（如可能）

### 功能请求
1. 描述需求场景
2. 说明预期功能
3. 提供使用示例

## 许可证信息

本技能遵循MIT许可证。详见技能目录中的LICENSE文件（如有）。

## 版本历史

### v1.0.0 (2026-02-27)
- 初始版本发布
- 支持表格提取、字段提取、批量处理
- 包含完整文档和示例

---
*安装文档最后更新：2026-02-27*
*技能版本：1.0.0*
