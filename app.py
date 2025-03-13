import torch
model = FAQClassifier(output_dim=1000).cuda()
criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters(), lr=0.001)
for epoch in range(50):
    for batch_x, batch_y in data_loader:
        batch_x, batch_y = batch_x.cuda(), batch_y.cuda()
        optimizer.zero_grad()
        outputs = model(batch_x)
        loss = criterion(outputs, batch_y)
        loss.backward()
        optimizer.step()