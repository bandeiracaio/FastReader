# Context7 Notes

## What It Is
Context7 is an MCP (Model Context Protocol) server by Upstash that provides up-to-date, version-specific documentation and code examples from source repositories to AI coding assistants. It aims to reduce hallucinations and stale API usage by injecting verified docs into the model context.  
Sources: https://context7.com/about , https://context7.com/docs/overview

## Core Flow
1) Resolve a library identifier from a library name.  
2) Query documentation snippets for a specific topic or request, optionally scoped by version.  
3) Inject the retrieved snippets into the model context to guide code generation.  
Sources: https://github.com/mcp/upstash/context7 , https://context7.com/docs/overview

## Features
- Version-specific documentation and examples.  
- Library metadata and discovery support.  
- SDK access (TypeScript) for programmatic queries.  
- Topic filtering and token limits to control context size.  
- API key support with higher rate limits and private repo access.  
Sources: https://github.com/mcp/upstash/context7 , https://context7.com/docs/sdks/ts/getting-started , https://context7.com/docs/installation , https://www.mcp-directory.net/server/context7-mcp-upstash

## Client Integrations
Context7 can be configured in MCP-compatible clients and IDEs via HTTP or local stdio transport. It supports rules/automation to auto-trigger doc retrieval for relevant prompts.  
Sources: https://context7.com/docs/installation

## Limitations / Trade-offs
- Token overhead from large doc snippets.  
- Potential lag between upstream repo updates and crawled docs.  
- Inconsistent quality for community-contributed libraries.  
Sources: https://www.reddit.com//r/ClaudeAI/comments/1oyqi8e/am_i_missing_something_with_the_context7_mcp_hype/ , https://www.reddit.com//r/ClaudeAI/comments/1muoes4/deep_dive_i_dug_and_dug_and_finally_found_out_how/ , https://mcipe.com/en/server/context7

## Public Interface Summary (Observed)
- Resolve library ID tool (e.g., `resolve-library-id`).  
- Query docs tool (e.g., `query-docs`) by library ID and topic/version.  
- SDK and HTTP endpoints for integration.  
Source: https://github.com/mcp/upstash/context7

## Practical Usage Patterns
- Configure Context7 as an MCP server in the IDE.  
- Use “use context7” to trigger doc lookup before code generation.  
- Pin to a library ID or version to remove ambiguity.  
Sources: https://context7.com/docs/installation , https://github.com/mcp/upstash/context7

## Relevance to FastReader
If a similar documentation tool is desired, potential capabilities include:
- Resolve library IDs and query docs by topic/version.  
- Token limit controls for injected context.  
- Optional API keys and private source support.  
Sources: https://context7.com/docs/overview , https://github.com/mcp/upstash/context7
