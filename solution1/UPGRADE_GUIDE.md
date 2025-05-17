# Independent React 20 Upgrade Guide

This document outlines how a single team can upgrade their micro frontend to React 20 (and other core libraries) without requiring other teams to change their applications.

## Prerequisites

Before beginning the upgrade process, ensure:

1. You have a proper testing environment that mirrors production
2. You have automated tests for your micro frontend
3. You understand the breaking changes in React 20
4. You've communicated your upgrade timeline to other teams (even though they won't need to change anything)

## Step-by-Step Upgrade Process

### 1. Update the Module Federation Configuration

First, modify your `vite.config.js` or `vite.config.ts` file to update the version specified in the shared dependencies:

```javascript
// For example, in app1/vite.config.js
{
  plugins: [
    federation({
      // ... other config
      shared: {
        react: {
          requiredVersion: "^20.0.0", // Update to React 20
          singleton: true,
          eager: true,
        },
        "react-dom": {
          requiredVersion: "^20.0.0", // Update to React 20
          singleton: true,
          eager: true,
        },
        // Update other core libraries as needed
      },
    }),
  ];
}
```

### 2. Update package.json

Update your package.json dependencies:

```json
{
  "dependencies": {
    "react": "^20.0.0",
    "react-dom": "^20.0.0"
    // Update other dependencies as needed
  }
}
```

### 3. Install New Dependencies

```bash
npm install
# or
yarn
```

### 4. Update Code for React 20 Breaking Changes

Refactor your micro frontend codebase to accommodate any breaking changes in React 20. This might include:

- Updating deprecated API calls
- Modifying component lifecycle methods
- Adapting to new React feature patterns

### 5. Local Testing

Test your micro frontend in isolation:

```bash
npm run dev
# or
yarn dev
```

Verify that your application works correctly with the new React version.

### 6. Integration Testing

Test your micro frontend with the shell application to ensure proper integration:

1. Build your updated micro frontend:

   ```bash
   npm run build
   ```

2. Start your micro frontend's preview server:

   ```bash
   npm run preview
   ```

3. Start the shell application (which is still using the older React version)

4. Verify that your micro frontend loads correctly within the shell

### 7. Deploy Your Updated Micro Frontend

Deploy only your micro frontend with the new React version. The shell and other micro frontends continue to use their existing React versions.

## Handling the Shell Application Dependency

A common concern is: "What if my team wants to upgrade React but our micro frontend depends on the shell application which we can't modify?"

### Understanding Version Resolution in Module Federation

When multiple applications with different version requirements for the same library are federated together:

1. The Module Federation plugin performs version resolution at runtime
2. For libraries marked as `singleton: true` (like React), only one instance will be loaded
3. Which version gets used depends on:
   - The order of loading (shell usually loads first)
   - Version compatibility (semver rules apply)
   - Which application provides the implementation

### Strategies for Upgrading Despite Shell Constraints

#### Option 1: Semver-Compatible Upgrades

If your upgrade is within semver compatibility (e.g., shell uses `^18.0.0` and you want to use `18.2.0`):

1. Simply update your version as described in the steps above
2. The highest compatible version will be used at runtime
3. No additional steps needed

#### Option 2: For Major Version Upgrades

If you're upgrading to a major version (e.g., shell uses React 18 but you want React 20):

1. Coordinate with the shell team to ensure their version specifier is sufficiently relaxed:

   ```javascript
   // In the shell's configuration
   shared: {
     react: {
       requiredVersion: '^18.0.0',  // Change to something like ">=18.0.0"
       singleton: true
     }
   }
   ```

2. If the shell team can't modify their configuration, you have these options:

   a) **Use runtime feature detection** in your code:

   ```javascript
   // In your components
   if (React.version.startsWith("18")) {
     // Use React 18 compatible code
   } else {
     // Use React 20 features
   }
   ```

   b) **Create compatibility wrappers** for components that utilize version-specific features

   c) **Implement fallbacks** for APIs not available in the loaded React version

#### Option 3: Sandbox Your Micro Frontend

In extreme cases where compatibility cannot be maintained:

1. Consider not sharing React as a singleton for your specific micro frontend
2. Load your own copy of React (note: this defeats some benefits of Module Federation)
3. Use techniques like Shadow DOM to isolate your micro frontend's DOM

#### Option 4: Staged Upgrade Path

Work with all teams to create a staged upgrade plan:

1. Shell team relaxes version constraints (e.g., `>=18.0.0`)
2. Your team upgrades
3. Other teams upgrade at their pace
4. Eventually, shell team upgrades as well
5. Version constraints can be tightened again

## How This Works Under the Hood

The Module Federation architecture with singleton configuration ensures:

1. **Only one instance of React runs at runtime**: Even though different micro frontends specify different versions, Module Federation ensures a single React instance is used.

2. **Version negotiation**: The shared dependencies configuration handles version resolution:

   - If your `requiredVersion` is compatible with other teams' specified versions, the highest compatible version will be used
   - If incompatible, the system will still function but will log warning messages about version mismatches

3. **Backward compatibility**: As long as React 20 maintains backward compatibility with the APIs used by other micro frontends, everything will continue to work

## Potential Challenges and Solutions

### Challenge: Breaking Changes in React APIs

**Solution**: If React 20 introduces breaking changes that affect shared components or APIs, you may need to:

- Create adapter components to bridge between versions
- Temporarily duplicate some shared components until all teams upgrade
- Use feature detection to provide backward compatibility

### Challenge: Runtime Warnings About Version Mismatches

**Solution**: These warnings are expected and can be safely ignored as long as your application is functioning correctly. They serve as documentation of which teams are on which versions.

### Challenge: Performance Impacts

**Solution**: Monitor performance closely after the upgrade. If you notice degradation, you might need to optimize your specific implementation or work with other teams to coordinate a full upgrade.

## Communication with Other Teams

While other teams don't need to change their code, it's still good practice to:

1. Announce your upgrade plans in advance
2. Share documentation about any behavioral changes they might observe
3. Provide a timeline for when you expect to complete the upgrade
4. Share lessons learned after the upgrade to help other teams when they upgrade

## Conclusion

The beauty of the micro frontend architecture is that it allows teams to upgrade their dependencies independently. By following this guide, you can upgrade to React 20 without forcing other teams to change their schedules or priorities. This independent evolution capability is one of the key benefits of our Module Federation implementation.
