> **Summary:** On June 2nd, 2026, a misconfigured auto-scaling policy caused our primary ingestion workers to systematically terminate during peak load, resulting in a 14-minute partial outage for the European region.

## Timeline
- **08:14 UTC**: High error rate alerts triggered in the EU-West zone.
- **08:18 UTC**: On-call engineer acknowledged the P1 incident and initiated incident response protocols.
- **08:24 UTC**: Identified that the `worker-node` Auto Scaling Group (ASG) was scaling down unexpectedly despite CPU metrics exceeding 85%.
- **08:28 UTC**: ASG scale-in processes were manually suspended. 10 new nodes were provisioned.
- **08:35 UTC**: Queue backlog cleared, error rates returned to baseline.

## Root Cause
The root cause was traced to a recent deployment of our infrastructure-as-code (IaC) configuration. A targeted scale-in policy intended for the staging environment was inadvertently applied to the production Terraform state.

Because the staging policy relied on a different metric threshold (`sqs_queue_depth < 100`), the production ASG interpreted the standard baseline traffic as a low-utilization event, triggering aggressive termination of healthy nodes.

## Remediation

We immediately suspended the scale-in processes using the AWS CLI and reverted the Terraform state to the previous stable release.

```bash
# Suspend scale-in processes manually to halt the cascade
aws autoscaling suspend-processes \
    --auto-scaling-group-name prod-ingestion-workers \
    --scaling-processes Terminate

# Re-evaluate desired capacity
aws autoscaling set-desired-capacity \
    --auto-scaling-group-name prod-ingestion-workers \
    --desired-capacity 40 \
    --honor-cooldown
```

## Action Items
1. **Critical:** Implement strict environment tagging checks in the CI/CD pipeline to prevent staging policies from merging into the `main` branch.
2. **High:** Refine P1 alerts to monitor the rate of node termination rather than just queue latency.
3. **Medium:** Conduct a comprehensive audit of all existing ASG policies across the EU region.
